const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 8, select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  phone: { type: String, required: true, trim: true },
  address: String,
  resetPasswordToken: { type: String, select: false },
  resetPasswordExpires: { type: Date, select: false },
  phoneOtpHash: { type: String, select: false },
  phoneOtpExpires: { type: Date, select: false },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }]
}, { timestamps: true });
schema.pre('save', async function(next) { if (!this.isModified('password')) return next(); this.password = await bcrypt.hash(this.password, 12); next(); });
schema.methods.matchPassword = function(password) { return bcrypt.compare(password, this.password); };
module.exports = mongoose.model('User', schema);
