const mongoose = require('mongoose');
const COMPETENCIES = require('../config/competencies')

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
    // This replaces ad hoc per-question weights with one reviewable table per department, with every value traceable to documented overview and skillsNeeded evidence.
    competencyProfile: {
      type: Map,
      of: { type: Number, min: 0, max: 3 },
      default: {},
      validate: {
        validator(profile) {
          return [...profile.keys()].every((key) => COMPETENCIES.includes(key))
        },
        message: 'Competency profile contains an unknown competency key',
      },
    },
    // Provenance makes profile values auditable; requiring it prevents unsupported competency scores from appearing as authoritative facts.
    assessmentNotes: {
      type: String,
      required: true,
      trim: true,
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