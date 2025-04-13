const express = require('express');
const counsellorController = require('../controllers/counsellorController');
const router = express.Router();

router.get('/', counsellorController.getAllCounsellors);

module.exports = router;