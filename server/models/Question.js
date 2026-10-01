const mongoose = require('mongoose')
const COMPETENCIES = require('../config/competencies')

const questionSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  category: { type: String, required: true },
  text: { type: String, required: true },
  options: [{
    text: { type: String, required: true },
    // Options describe the competencies they measure; department-specific values come only from Department.competencyProfile at scoring time.
    competencies: [{ type: String, enum: COMPETENCIES, required: true }],
  }],
})

module.exports = mongoose.model('Question', questionSchema)