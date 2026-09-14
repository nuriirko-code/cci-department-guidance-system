const Question = require('../models/Question')
const Department = require('../models/Department')
const QuizResponse = require('../models/QuizResponse')

async function submitQuiz(req, res) {
  try {
    const { answers } = req.body
    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ message: 'Quiz answers are required' })
    }

    const questions = await Question.find()
    if (questions.length === 0) {
      return res.status(400).json({ message: 'No quiz questions are available. Seed the database first.' })
    }
    const scores = { CS: 0, SWE: 0, IT: 0, IS: 0, ISC: 0, STAT: 0 }

    questions.forEach((question) => {
      const selected = answers[question.id]
      if (!selected || !selected.weights) return
      Object.keys(scores).forEach((dept) => {
        scores[dept] += selected.weights[dept] || 0
      })
    })

    const maxScores = { CS: 0, SWE: 0, IT: 0, IS: 0, ISC: 0, STAT: 0 }
    questions.forEach((question) => {
      Object.keys(maxScores).forEach((dept) => {
        const highest = Math.max(...question.options.map((o) => o.weights[dept] || 0))
        maxScores[dept] += highest
      })
    })

    const percentages = {}
    Object.keys(scores).forEach((dept) => {
      percentages[dept] = maxScores[dept] > 0 ? Math.round((scores[dept] / maxScores[dept]) * 100) : 0
    })

    const ranked = Object.entries(percentages)
      .map(([code, percent]) => ({ code, percent }))
      .sort((a, b) => b.percent - a.percent)

    const top = ranked[0]
    const topDepartment = await Department.findOne({ code: top.code })
    if (!topDepartment) {
      return res.status(400).json({ message: `Department data for ${top.code} is missing. Seed the database first.` })
    }

    const explanationText = `Your answers show ${topDepartment.blurb} — the strongest signal among all six CCI departments.`

    const savedResponse = await QuizResponse.create({
      answers,
      scoresByDepartment: percentages,
      matchedDepartmentCode: top.code,
      matchPercent: top.percent,
      explanationText,
    })

    res.status(201).json({
      topMatch: { code: top.code, name: topDepartment.name, percent: top.percent, explanation: explanationText },
      secondaryMatches: ranked.slice(1, 4),
      responseId: savedResponse._id,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to process quiz', error: error.message })
  }
}

module.exports = { submitQuiz }
