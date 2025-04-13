const express = require('express');
const bookingController = require('../controllers/bookingController');
const router = express.Router();

router.post('/messages/:counsellorId', bookingController.sendMessage);
router.get('/messages/:counsellorId', bookingController.getMessages);
router.post('/sessions', bookingController.bookSession);
router.get('/sessions/user', bookingController.getUserSessions);
router.get('/sessions/counsellor', bookingController.getCounsellorSessions);

module.exports = router;