const express = require("express");
const router = express.Router();
const {subscribe, unsubscribe, getAllSubscriptions} = require('@/controllers/newsletter')
const { authenticateToken } = require('@/middleware/auth')
const {requireAdmin} = require('@/middleware/admin')

//Register Route
router.post('/subscribe', subscribe);

//Login Route
router.post('/unsubscribe', unsubscribe);

// Delete Account Route
router.get('/subscribes', authenticateToken, requireAdmin, getAllSubscriptions)

module.exports = router;