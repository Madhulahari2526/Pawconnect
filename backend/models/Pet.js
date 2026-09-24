const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }, species: { type: String, required: true, enum: ['Dog','Cat','Bird','Cow','Rabbit','Fish','Other'] },
  breed: String, price: { type: Number, min: 0, default: 0 }, age: { type: Number, min: 0 }, gender: { type: String, enum: ['Male','Female','Unknown'], default: 'Unknown' },
  size: { type: String, enum: ['Small','Medium','Large'], default: 'Medium' }, description: String, location: String,
  image: String, imagePublicId: String, contactPhone: String, status: { type: String, enum: ['available','pending','adopted','rescued'], default: 'available' },
  vaccinated: { type: Boolean, default: false }, createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
schema.index({ name: 'text', breed: 'text', species: 'text', description: 'text', location: 'text' });
module.exports = mongoose.model('Pet', schema);
