const Feedback = require('../models/Feedback')

async function getAllFeedback(req, res) {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 })
    res.status(200).json(feedback)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch feedback', error: error.message })
  }
}

async function submitFeedback(req, res) {
  try {
    // Create a new feedback document in the database using the data from the request body.
    const feedback = await Feedback.create(req.body)
    res.status(201).json(feedback)
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit feedback', error: error.message })
  }
}

module.exports = { getAllFeedback, submitFeedback }
