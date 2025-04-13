const CounsellorProfile = require('../models/counsellorProfile');

const counsellorController = {
  getAllCounsellors: async (req, res) => {
    try {
      // fetch all where role is counsellor AND specialization is not null/empty
      const counsellors = await CounsellorProfile.find({
        role: 'counsellor',
      });
      res.status(200).json(counsellors);
    } catch (error) {
      console.error('Error fetching counsellors:', error);
      res.status(500).json({ message: 'Failed to fetch counsellors' });
    }
  },

  // Add more controller methods for specific counsellor operations if needed
};

module.exports = counsellorController;