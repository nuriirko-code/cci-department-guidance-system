const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  category: { type: String, required: true },
  text: { type: String, required: true },
  options: [{
    text: { type: String, required: true },
      // A Map keeps scoring data open to any department code, so adding a department later does not require a schema change or deployment.
    weights: {
        type: Map,
        of: Number,
        default: {},
    },
  }],
})

module.exports = mongoose.model('Question', questionSchema)