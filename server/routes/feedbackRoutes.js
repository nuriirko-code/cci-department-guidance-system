const express = require('express')
const router = express.Router()
const { getAllFeedback, submitFeedback } = require('../controllers/feedbackController')
const { authenticateToken, requireAdmin } = require('../middleware/auth')

router.get('/', authenticateToken, requireAdmin, getAllFeedback)
router.post('/', submitFeedback)

module.exports = router
