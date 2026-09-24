const nodemailer = require('nodemailer');

function getTransporter() {
  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD'];
  if (required.some((key) => !process.env[key])) return null;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });
}

async function sendRegistrationEmail({ name, email }) {
  const transporter = getTransporter();
  if (!transporter || !process.env.EMAIL_FROM) return false;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Welcome to PawConnect',
    text: `Hi ${name},\n\nYour PawConnect registration was successful. You can now find and adopt a loving pet.\n\nThank you,\nPawConnect`,
    html: `<p>Hi ${name},</p><p>Your PawConnect registration was successful. You can now find and adopt a loving pet.</p><p>Thank you,<br>PawConnect</p>`
  });
  return true;
}

async function sendPasswordResetEmail({ name, email, token }) {
  const transporter = getTransporter();
  if (!transporter || !process.env.EMAIL_FROM) return false;
  const resetUrl = `${(process.env.CLIENT_URL || '').split(',')[0].replace(/\/$/, '')}/reset-password?token=${encodeURIComponent(token)}`;
  await transporter.sendMail({
    from: process.env.EMAIL_FROM, to: email, subject: 'Reset your PawConnect password',
    text: `Hi ${name},\n\nReset your password using this link (valid for one hour): ${resetUrl}\n\nIf you did not request this, you can ignore this email.`,
    html: `<p>Hi ${name},</p><p><a href="${resetUrl}">Reset your PawConnect password</a> (this link is valid for one hour).</p><p>If you did not request this, you can ignore this email.</p>`
  });
  return true;
}

module.exports = { sendRegistrationEmail, sendPasswordResetEmail };
