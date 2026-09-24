const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('../utils/asyncHandler');
const { sendRegistrationEmail } = require('../utils/mailer');
const crypto = require('crypto');

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const phonePattern = /^\+?[1-9]\d{7,14}$/;
const normalizePhone = (phone) => String(phone || '').replace(/[\s()-]/g, '');

function validateCredentials({ password, phone }) {
  if (!passwordPattern.test(password || '')) return 'Password must be at least 8 characters and include uppercase, lowercase and a number';
  if (phone !== undefined && !phonePattern.test(phone || '')) return 'Enter a valid phone number with country code';
  return null;
}

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, address } = req.body;
  const phone = String(req.body.phone || '').replace(/[\s()-]/g, '');
  if (!name || !email || !password || !phone) return res.status(400).json({ message: 'Name, email, phone and password are required' });
  const validationError = validateCredentials({ password, phone });
  if (validationError) return res.status(400).json({ message: validationError });
  if (await User.findOne({ email })) return res.status(409).json({ message: 'Email already registered' });
  const user = await User.create({ name, email, password, phone, address });
  let emailSent = false;
  try {
    emailSent = await sendRegistrationEmail({ name: user.name, email: user.email });
  } catch (error) {
    console.error(`Registration email failed for ${user.email}: ${error.message}`);
  }
  res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token: generateToken(user), emailSent });
});
exports.login = asyncHandler(async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(req.body.password || ''))) return res.status(401).json({ message: 'Invalid email or password' });
  res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token: generateToken(user) });
});
exports.requestPhoneOtp = asyncHandler(async (req, res) => {
  const phone = normalizePhone(req.body.phone);
  if (!phonePattern.test(phone)) return res.status(400).json({ message: 'Enter a valid phone number with country code' });
  const user = await User.findOne({ phone }).select('+phoneOtpHash +phoneOtpExpires');
  if (!user) return res.status(404).json({ message: 'No account found for this phone number' });
  const otp = String(crypto.randomInt(100000, 1000000));
  user.phoneOtpHash = crypto.createHash('sha256').update(otp).digest('hex');
  user.phoneOtpExpires = Date.now() + 5 * 60 * 1000;
  await user.save({ validateBeforeSave: false });
  // Connect an SMS provider here for production delivery. Local development receives the OTP in the response.
  const response = { message: 'OTP generated. Configure an SMS provider to deliver it by text.' };
  if (process.env.NODE_ENV !== 'production') response.demoOtp = otp;
  res.json(response);
});
exports.verifyPhoneOtp = asyncHandler(async (req, res) => {
  const phone = normalizePhone(req.body.phone);
  const otp = String(req.body.otp || '');
  const hash = crypto.createHash('sha256').update(otp).digest('hex');
  const user = await User.findOne({ phone }).select('+phoneOtpHash +phoneOtpExpires');
  if (!user || !user.phoneOtpHash || user.phoneOtpHash !== hash || !user.phoneOtpExpires || user.phoneOtpExpires < Date.now()) {
    return res.status(401).json({ message: 'Invalid or expired OTP' });
  }
  user.phoneOtpHash = undefined;
  user.phoneOtpExpires = undefined;
  await user.save({ validateBeforeSave: false });
  res.json({ user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role }, token: generateToken(user) });
});
exports.forgotPassword = asyncHandler(async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const user = await User.findOne({ email }).select('+resetPasswordToken +resetPasswordExpires');
  if (user) {
    const rawToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
    await user.save({ validateBeforeSave: false });
    const { sendPasswordResetEmail } = require('../utils/mailer');
    try { await sendPasswordResetEmail({ name: user.name, email: user.email, token: rawToken }); } catch (error) {
      console.error(`Password reset email failed for ${user.email}: ${error.message}`);
    }
  }
  res.json({ message: 'If an account exists for that email, a password reset link has been sent.' });
});
exports.resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const validationError = validateCredentials({ password });
  if (validationError) return res.status(400).json({ message: validationError });
  const hashedToken = crypto.createHash('sha256').update(String(token || '')).digest('hex');
  const user = await User.findOne({ resetPasswordToken: hashedToken, resetPasswordExpires: { $gt: Date.now() } }).select('+resetPasswordToken +resetPasswordExpires');
  if (!user) return res.status(400).json({ message: 'Reset link is invalid or has expired' });
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.json({ message: 'Password reset successful. You can now log in.' });
});
exports.me = asyncHandler(async (req, res) => res.json({ user: req.user }));
