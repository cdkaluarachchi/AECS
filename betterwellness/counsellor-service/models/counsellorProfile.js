const mongoose = require('mongoose');

const counsellorProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true }, // Consider fetching from user service
  role: { type: String, required: true },
  // Add more counsellor-specific profile details
});

module.exports = mongoose.model('User', counsellorProfileSchema);