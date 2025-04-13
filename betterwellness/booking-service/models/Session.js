const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  counsellorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateTime: { type: Date, required: true },
  notes: { type: String },

}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);