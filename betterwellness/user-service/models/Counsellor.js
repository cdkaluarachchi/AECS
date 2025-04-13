const mongoose = require('mongoose');

const counsellorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String },
  lname: { type: String },
  role: { type: String, enum: ['customer', 'counsellor'], default: 'customer' },

});

module.exports = mongoose.model('Counsellor', counsellorSchema);