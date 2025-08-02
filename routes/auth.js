const express = require("express");
const router = express.Router();
const {register, login, deleteAccount} = require('@/controllers/auth')
const { authenticateToken } = require('@/middleware/auth')

//Register Route
router.post('/register', register);

//Login Route
router.post('/login', login);

// Delete Account Route
router.delete('/delete-account', authenticateToken,deleteAccount)

module.exports = router;