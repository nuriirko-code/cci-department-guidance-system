const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
      order: {
        type: Number,
        required: true,
        default: 0
    },
    name: {
        type: String,
        required: true
    },
     color: {
        type: String,
        required: true
    },
     blurb: {
        type: String,
        required: true
    },
    verified: {
        type: String,
        enum: ['general', 'hod'],
        default: 'general'
    },
    hod: {
    name: { type: String, default: null },
    photo: { type: String, default: null },
  },
    history: {
        established: { type: String, default: null },
        origin: { type: String, default: null }
},
overview: String,
  duration: String,
  studentBody: String,
  faculty: String,
  skillsNeeded: [String],
  facilities: String,
  activities: [String],
  careerPaths: [String],
  marketDemand: String,
  postgrad: String,

}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);