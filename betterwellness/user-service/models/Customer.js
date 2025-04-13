const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

  email: { type: String, required: true, unique: true },
  fname: { type: String },
  lname: { type: String },
  role: { type: String, enum: ['customer', 'counsellor'], default: 'customer' },
});

module.exports = mongoose.model('Customer', customerSchema);