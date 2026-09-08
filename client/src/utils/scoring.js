

/**
 * 1. Calculates the raw points a student earned based on their chosen radio options.
 * @param {Object} answers - Format: { "1": { text: "...", weights: {...} }, "2": ... }
 * @param {Array} questions - The master mock questions array
 */
export function calculateScores(answers, questions) {
  const scores = { CS: 0, SWE: 0, IT: 0, IS: 0, ISC: 0, STAT: 0 }

  questions.forEach((question) => {
    // Grab the exact option object the user clicked for this question ID
    const selectedOption = answers[question.id]

    // Safety check: if they somehow skipped it or didn't answer, don't crash
    if (!selectedOption || !selectedOption.weights) {
      return
    }

    // Directly add the predefined weights of their selected option to our total scoreboard
    scores.CS += selectedOption.weights.CS || 0
    scores.SWE += selectedOption.weights.SWE || 0
    scores.IT += selectedOption.weights.IT || 0
    scores.IS += selectedOption.weights.IS || 0
    scores.ISC += selectedOption.weights.ISC || 0
    scores.STAT += selectedOption.weights.STAT || 0
  })

  return scores
}

/**
 * 2. Scans every question to find the maximum possible points achievable for each department.
 * Why? If a student selects the absolute best option for CS on every question, what is that perfect ceiling score?
 */
export function getMaxPossibleScores(questions) {
  const max = { CS: 0, SWE: 0, IT: 0, IS: 0, ISC: 0, STAT: 0 }

  questions.forEach((question) => {
    // Loop through each department key inside our max object ('CS', 'SWE', etc.)
    Object.keys(max).forEach((dept) => {
      // Map out all option weights for this department, e.g., [2, 3, 5, 1], and find the highest number (5)
      const highest = Math.max(...question.options.map((o) => o.weights[dept] || 0))
      // Add that absolute highest possible weight to the department's ceiling total
      max[dept] += highest
    })
  })
  return max
}

/**
 * 3. Converts raw earned scores into user-friendly matching percentages.
 */
export function toPercentages(scores, maxScores) {
  const percentages = {}
  
  Object.keys(scores).forEach((dept) => {
    // Formula: (Earned Points / Max Possible Points) * 100
    // The conditional check prevents a "divide by zero" mathematical error if maxScores is 0
    percentages[dept] = maxScores[dept] > 0 
      ? Math.round((scores[dept] / maxScores[dept]) * 100) 
      : 0
  })
  return percentages
}

/**
 * 4. Takes the unordered percentage object and structures it into an orderly, sorted array.
 * Converts: { CS: 45, SWE: 85 } into: [ { code: 'SWE', percent: 85 }, { code: 'CS', percent: 45 } ]
 */
export function getRankedMatches(percentages) {
  return Object.entries(percentages) // Splits key-value pairs into sub-arrays
    .map(([code, percent]) => ({ code, percent })) // Formats arrays neatly into object shapes
    .sort((a, b) => b.percent - a.percent) // Sorts descending: highest matching percentage always wins index [0]
}
