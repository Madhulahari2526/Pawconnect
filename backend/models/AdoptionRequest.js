const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: String, status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
  decisionNote: String, decidedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
schema.index({ pet: 1, applicant: 1 }, { unique: true });
module.exports = mongoose.model('AdoptionRequest', schema);
