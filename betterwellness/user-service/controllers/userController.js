const User = require('../models/User'); 

const userController = {

  getCustomerProfileByEmail: async (req, res) => {
    try {
      const email = req.query.email; 
      const customer = await User.findOne({ email, role: 'customer' }).select('-password'); // Exclude password
      if (!customer) {
        return res.status(404).json({ message: 'Customer profile not found' });
      }
      res.status(200).json(customer);
    } catch (error) {
      console.error('Error fetching customer profile by email:', error);
      res.status(500).json({ message: 'Failed to fetch profile' });
    }
  },

  getCounsellorProfileByEmail: async (req, res) => {
    try {
      const email = req.query.email; 
      const counsellor = await User.findOne({ email, role: 'counsellor' }).select('-password'); // Exclude password
      if (!counsellor) {
        return res.status(404).json({ message: 'Counsellor profile not found' });
      }
      res.status(200).json(counsellor);
    } catch (error) {
      console.error('Error fetching counsellor profile by email:', error);
      res.status(500).json({ message: 'Failed to fetch profile' });
    }
  },
};

module.exports = userController;