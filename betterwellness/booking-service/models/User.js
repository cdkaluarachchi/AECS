const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true }, 
  role: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);