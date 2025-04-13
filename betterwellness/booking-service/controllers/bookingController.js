const Session = require('../models/Session');
const Message = require('../models/Message');
const User = require('../models/User'); 

const bookingController = {
  sendMessage: async (req, res) => {
    try {
      const { counsellorId } = req.params;
      const { text } = req.body;
      const newMessage = new Message({
        senderId: req.user.userId,
        receiverId: counsellorId,
        text,
      });
      await newMessage.save();
      res.status(201).json(newMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ message: 'Failed to send message' });
    }
  },

  getMessages: async (req, res) => {
    try {
      const { counsellorId } = req.params;
      const messages = await Message.find({
        $or: [
          { senderId: req.user.userId, receiverId: counsellorId },
          { senderId: counsellorId, receiverId: req.user.userId },
        ],
      }).sort({ timestamp: 1 });
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ message: 'Failed to fetch messages' });
    }
  },

  bookSession: async (req, res) => {
    try {
      const { counsellorId, dateTime, notes } = req.body;
      const newSession = new Session({
        customerId: req.user.userId,
        counsellorId,
        dateTime: new Date(dateTime),
        notes,
      });
      await newSession.save();
      res.status(201).json({ success: true, message: 'Session booked successfully' });
    } catch (error) {
      console.error('Error booking session:', error);
      res.status(500).json({ message: 'Failed to book session' });
    }
  },

  getUserSessions: async (req, res) => {
    try {
      const sessions = await Session.find({ customerId: req.user.userId }).populate('counsellorId', 'name'); 
      res.status(200).json(sessions);
    } catch (error) {
      console.error('Error fetching user sessions:', error);
      res.status(500).json({ message: 'Failed to fetch sessions' });
    }
  },

  getCounsellorSessions: async (req, res) => {
    try {
      const sessions = await Session.find({ counsellorId: req.user.userId }).populate('customerId', 'name');
      res.status(200).json(sessions);
    } catch (error) {
      console.error('Error fetching counsellor sessions:', error);
      res.status(500).json({ message: 'Failed to fetch counsellor appointments' });
    }
  },

};

module.exports = bookingController;