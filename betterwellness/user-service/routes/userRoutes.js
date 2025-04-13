const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/customer/profile', userController.getCustomerProfileByEmail);

router.get('/counsellor/profile', userController.getCounsellorProfileByEmail);

module.exports = router;