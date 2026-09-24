const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
  matchedDepartmentCode: { type: String, required: true },
  helpful: { type: Boolean, required: true },
  comment: { type: String, default: '' },
}, { timestamps: true })

module.exports = mongoose.model('Feedback', feedbackSchema)
