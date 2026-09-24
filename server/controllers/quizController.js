// These models connect this controller to the three MongoDB collections used by one quiz submission:
// Question supplies the quiz rules, Department supplies the winning department details,
// and QuizResponse stores a record of the student's result.
const Question = require('../models/Question')
const Department = require('../models/Department')
const QuizResponse = require('../models/QuizResponse')

// This function is called by quizRoutes.js for POST /api/quiz.
// The frontend reaches this point through submitQuiz() in client/src/services/api.js
// after Questionnaire.jsx has collected the student's answers.
async function submitQuiz(req, res) {
  try {
    // Express places the JSON request body in req.body. The frontend sends an
    // answers object whose keys are question IDs and whose values are selected options.
    const { answers } = req.body
    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ message: 'Quiz answers are required' })
    }

    // Load both collections so recommendations reflect the current departments and their current question-scoring rules.
    const questions = await Question.find()
    const departments = await Department.find()
    if (questions.length === 0) {
      return res.status(400).json({ message: 'No quiz questions are available. Seed the database first.' })
    }
    if (departments.length === 0) {
      return res.status(400).json({ message: 'No departments are available. Seed the database first.' })
    }

    // Initialize scores from MongoDB rather than a fixed list, allowing every current department to participate.
    const scores = {}
    const maxScores = {}
    departments.forEach((department) => {
      scores[department.code] = 0
      maxScores[department.code] = 0
    })

    // Resolve each submitted option against the Mongoose question document so its Map weights can be read with .get().
    questions.forEach((question) => {
      const selected = answers[question.id]
      if (!selected || !selected.weights) return
      const selectedOption = question.options.find((option) => option.text === selected.text)
      if (!selectedOption) return
      Object.keys(scores).forEach((departmentCode) => {
        const weight = selectedOption.weights.get(departmentCode) || 0
        scores[departmentCode] += weight
      })
    })

    // Calculate each department's maximum possible score dynamically so percentages remain comparable for newly added departments.
    questions.forEach((question) => {
      Object.keys(maxScores).forEach((departmentCode) => {
        const highest = Math.max(...question.options.map((option) => option.weights.get(departmentCode) || 0))
        maxScores[departmentCode] += highest
      })
    })

    // Normalize every current department's score into a percentage for ranking.
    const percentages = {}
    Object.keys(scores).forEach((dept) => {
      percentages[dept] = maxScores[dept] > 0 ? Math.round((scores[dept] / maxScores[dept]) * 100) : 0
    })

    // Rank every current department so the first result is the recommendation and the next results become alternatives on Results.jsx.
    const ranked = Object.entries(percentages)
      .map(([code, percent]) => ({ code, percent }))
      .sort((a, b) => b.percent - a.percent)

    const top = ranked[0]

    // Scores only identify a department code. Fetch the full department document so the
    // response can include its name and blurb for the student-facing results page.
    const topDepartment = await Department.findOne({ code: top.code })
    if (!topDepartment) {
      return res.status(400).json({ message: `Department data for ${top.code} is missing. Seed the database first.` })
    }

    // Build the explanation from the selected department's content without assuming how many departments exist.
    const explanationText = `Your answers show ${topDepartment.blurb} — the strongest signal among all current departments.`

    // Keep an audit/history record in MongoDB. This uses the same scores and answers that
    // produced the response, while the client receives only the fields needed for the UI.
    const savedResponse = await QuizResponse.create({
      answers,
      scoresByDepartment: percentages,
      matchedDepartmentCode: top.code,
      matchPercent: top.percent,
      explanationText,
    })

    // Return the recommendation, alternative matches, and saved response ID to api.js.
    // Questionnaire.jsx passes this result to Results.jsx through React Router state.
    res.status(201).json({
      topMatch: { code: top.code, name: topDepartment.name, percent: top.percent, explanation: explanationText },
      secondaryMatches: ranked.slice(1, 4),
      responseId: savedResponse._id,
    })
  } catch (error) {
    // Any unexpected database or processing failure becomes a consistent HTTP 500 response.
    // api.js converts this server message into a rejected Error for the frontend caller.
    res.status(500).json({ message: 'Failed to process quiz', error: error.message })
  }
}

module.exports = { submitQuiz }
