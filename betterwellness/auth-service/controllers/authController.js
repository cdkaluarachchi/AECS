const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'asdfasdwaewaew2'; 

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already exists' });
      }
      const newUser = new User({ name, email, password, role });
      await newUser.save();
      res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Failed to register user' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user._id, role: user.role, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Failed to login' });
    }
  },
};

module.exports = authController;