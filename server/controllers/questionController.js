const Question = require('../models/Question')
const Department = require('../models/Department')

async function getAllQuestions(req, res) {
  try {
    const questions = await Question.find()
    res.status(200).json(questions)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch questions', error: error.message })
  }
}

// This protected read closes the admin editing loop by exposing full option weights, not only the public quiz question text.
async function getAllQuestionsForAdmin(req, res) {
  try {
    const questions = await Question.find().sort({ id: 1 })
    res.status(200).json(questions)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch questions for admin', error: error.message })
  }
}

// This protected update is what makes a newly added department recommendable: admins can assign its code a meaningful weight across the question bank.
async function updateQuestionWeights(req, res) {
  try {
    const { options } = req.body
    if (!Array.isArray(options)) {
      return res.status(400).json({ message: 'An options array is required' })
    }

    // Build the allow-list from live departments so misspelled or deleted department codes cannot enter question weights.
    const departments = await Department.find({}, { code: 1 })
    const departmentCodes = new Set(departments.map((department) => department.code))

    // Validate every submitted Map key and value before allowing the question document to change.
    for (const option of options) {
      if (!option || typeof option.text !== 'string' || !option.text.trim()) {
        return res.status(400).json({ message: 'Each option must include text' })
      }
      for (const [code, weight] of Object.entries(option.weights || {})) {
        if (!departmentCodes.has(code)) {
          return res.status(400).json({ message: `Unknown department code in weights: ${code}` })
        }
        if (typeof weight !== 'number' || !Number.isFinite(weight)) {
          return res.status(400).json({ message: `Weight for ${code} must be a finite number` })
        }
      }
    }

    // Persist only the editable options while returning the updated question for the admin UI.
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { options },
      { new: true, runValidators: true },
    )
    if (!question) return res.status(404).json({ message: 'Question not found' })
    res.status(200).json(question)
  } catch (error) {
    res.status(500).json({ message: 'Failed to update question weights', error: error.message })
  }
}

module.exports = { getAllQuestions, getAllQuestionsForAdmin, updateQuestionWeights }