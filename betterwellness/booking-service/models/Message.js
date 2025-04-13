const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  // Optionally link to a session if messages are session-specific
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);