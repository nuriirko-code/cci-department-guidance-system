const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  category: { type: String, required: true },
  text: { type: String, required: true },
  options: [{
    text: { type: String, required: true },
    weights: {
      CS: { type: Number, required: true },
      SWE: { type: Number, required: true },
      IT: { type: Number, required: true },
      IS: { type: Number, required: true },
      ISC: { type: Number, required: true },
      STAT: { type: Number, required: true },
    },
  }],
})

module.exports = mongoose.model('Question', questionSchema)