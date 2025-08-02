const express = require("express");
const router = express.Router();
const {subscribe, unsubscribe, getAllSubscriptions} = require('@/controllers/newsletter')
const { authenticateToken } = require('@/middleware/auth')

//Register Route
router.post('/subscribe', subscribe);

//Login Route
router.post('/unsubscribe', authenticateToken, unsubscribe);

// Delete Account Route
router.get('/subscribes', authenticateToken, getAllSubscriptions)

module.exports = router;