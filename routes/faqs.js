const express = require("express");
const router = express.Router();
const {requireAdmin} = require('@/middleware/admin')
const { createFaq } = require("@/controllers/faqs")

//Register Route
router.post('/', requireAdmin, createFaq);

module.exports = router;