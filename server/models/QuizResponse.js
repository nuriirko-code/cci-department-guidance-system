const mongoose = require('mongoose')

const quizResponseSchema = new mongoose.Schema({
  answers: { type: mongoose.Schema.Types.Mixed, required: true },
  scoresByDepartment: { type: mongoose.Schema.Types.Mixed, required: true },
  matchedDepartmentCode: { type: String, required: true },
  matchPercent: { type: Number, required: true },
  explanationText: { type: String, default: '' },
}, { timestamps: true })

module.exports = mongoose.model('QuizResponse', quizResponseSchema)