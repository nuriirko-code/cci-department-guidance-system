const Question = require('../models/Question')
const COMPETENCIES = require('../config/competencies')

async function getAllQuestions(req, res) {
  try {
    const questions = await Question.find()
    res.status(200).json(questions)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch questions', error: error.message })
  }
}

// This protected read exposes option competency tags so admins can review and edit what each answer measures.
async function getAllQuestionsForAdmin(req, res) {
  try {
    const questions = await Question.find().sort({ id: 1 })
    res.status(200).json(questions)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch questions for admin', error: error.message })
  }
}

// This protected update lets admins classify answers without reintroducing department-specific scores into question data.
async function updateQuestionCompetencies(req, res) {
  try {
    const { options } = req.body
    if (!Array.isArray(options)) {
      return res.status(400).json({ message: 'An options array is required' })
    }

    // Validate tags against the canonical competency vocabulary before saving question meaning.
    for (const option of options) {
      if (!option || typeof option.text !== 'string' || !option.text.trim()) {
        return res.status(400).json({ message: 'Each option must include text' })
      }
      if (!Array.isArray(option.competencies) || option.competencies.some((competency) => !COMPETENCIES.includes(competency))) {
        return res.status(400).json({ message: 'Each option must contain only recognized competency tags' })
      }
    }

    // Persist tags only; department fit remains derived at quiz time from competencyProfile.
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { options },
      { new: true, runValidators: true },
    )
    if (!question) return res.status(404).json({ message: 'Question not found' })
    res.status(200).json(question)
  } catch (error) {
    res.status(500).json({ message: 'Failed to update question competencies', error: error.message })
  }
}

module.exports = { getAllQuestions, getAllQuestionsForAdmin, updateQuestionCompetencies }