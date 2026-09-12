const Question = require('../models/Question')

async function getAllQuestions(req, res) {
  try {
    const questions = await Question.find()
    res.status(200).json(questions)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch questions', error: error.message })
  }
}

module.exports = { getAllQuestions }