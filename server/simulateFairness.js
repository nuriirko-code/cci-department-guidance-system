require('dotenv').config()
const mongoose = require('mongoose')
const Department = require('./models/Department')
const Question = require('./models/Question')

// A seeded generator makes fairness results repeatable so profile or tag edits can be compared meaningfully.
function createRandom(seed) {
  let state = seed >>> 0
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 0x100000000
  }
}

// This score calculation mirrors quizController: each selected tag contributes the department's documented competency value.
function scoreAnswers(departments, questions, selectedOptions) {
  const scores = Object.fromEntries(departments.map((department) => [department.code, 0]))
  const maxScores = Object.fromEntries(departments.map((department) => [department.code, 0]))

  for (const question of questions) {
    for (const department of departments) {
      const fit = (option) => (option.competencies || []).reduce(
        (total, competency) => total + (department.competencyProfile.get(competency) || 0),
        0,
      )
      maxScores[department.code] += Math.max(0, ...question.options.map(fit))
      const selected = selectedOptions.get(question.id)
      if (selected) scores[department.code] += fit(selected)
    }
  }

  return Object.fromEntries(departments.map((department) => [
    department.code,
    maxScores[department.code] ? scores[department.code] / maxScores[department.code] : 0,
  ]))
}

// Each synthetic target student is more likely to choose options that measure competencies rated strongly by that target department; randomness preserves variation between students.
function chooseOptionForDepartment(question, department, random) {
  const affinities = question.options.map((option) => (option.competencies || []).reduce(
    (total, competency) => total + (department.competencyProfile.get(competency) || 0),
    0,
  ))
  const probabilities = affinities.map((affinity) => Math.exp(affinity / 2))
  const total = probabilities.reduce((sum, probability) => sum + probability, 0)
  let cursor = random() * total
  for (let index = 0; index < probabilities.length; index += 1) {
    cursor -= probabilities[index]
    if (cursor <= 0) return question.options[index]
  }
  return question.options.at(-1)
}

async function simulate() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    const [allDepartments, questions] = await Promise.all([
      Department.find().sort({ order: 1 }),
      Question.find().sort({ id: 1 }),
    ])
    const departments = allDepartments.filter((department) =>
      [...department.competencyProfile.keys()].length > 0,
    )

    if (departments.length === 0 || questions.length === 0) {
      throw new Error('Seed competency profiles and tagged questions before simulating fairness.')
    }

    const runsPerDepartment = Number(process.env.SIMULATION_RUNS || 1000)
    const random = createRandom(Number(process.env.SIMULATION_SEED || 20260929))
    const wins = Object.fromEntries(departments.map((department) => [department.code, 0]))

    for (const targetDepartment of departments) {
      for (let run = 0; run < runsPerDepartment; run += 1) {
        const selectedOptions = new Map(questions.map((question) => [
          question.id,
          chooseOptionForDepartment(question, targetDepartment, random),
        ]))
        const scores = scoreAnswers(departments, questions, selectedOptions)
        const highest = Math.max(...Object.values(scores))
        const winners = Object.keys(scores).filter((code) => Math.abs(scores[code] - highest) < 1e-12)
        if (winners.includes(targetDepartment.code)) wins[targetDepartment.code] += 1 / winners.length
      }
    }

    console.log(`Simulation: ${runsPerDepartment} synthetic students per department; fixed seed ${process.env.SIMULATION_SEED || 20260929}.`)
    console.log('Choice model: softmax probability from target profile fit (exp(fit / 2)); reported win rate means the target profile is top-ranked, with tied wins shared.')
    console.log('Department | Correct top recommendation')
    for (const department of departments) {
      const percentage = (wins[department.code] / runsPerDepartment) * 100
      console.log(`${department.code} | ${percentage.toFixed(1)}%`)
    }
    const excluded = allDepartments.filter((department) => !departments.includes(department))
    if (excluded.length) {
      console.log(`Excluded departments without competency profiles: ${excluded.map((department) => department.code).join(', ')}`)
    }
  } finally {
    await mongoose.connection.close()
  }
}

simulate().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
