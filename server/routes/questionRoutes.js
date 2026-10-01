const express = require('express')
const router = express.Router()
const {
	getAllQuestions,
	getAllQuestionsForAdmin,
	updateQuestionCompetencies,
} = require('../controllers/questionController')
const { authenticateToken, requireAdmin } = require('../middleware/auth')

// Public quiz clients receive questions, but only admins may inspect or change their scoring rules.
router.get('/admin', authenticateToken, requireAdmin, getAllQuestionsForAdmin)
router.get('/', getAllQuestions)
router.put('/:id/competencies', authenticateToken, requireAdmin, updateQuestionCompetencies)

module.exports = router