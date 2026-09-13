const BASE_URL = 'http://localhost:5000/api'

export async function getAllDepartments() {
  const res = await fetch(`${BASE_URL}/departments`)
  if (!res.ok) throw new Error('Failed to fetch departments')
  return res.json()
}

export async function getDepartment(code) {
  const res = await fetch(`${BASE_URL}/departments/${code}`)
  if (!res.ok) throw new Error('Department not found')
  return res.json()
}

export async function submitQuiz(answers) {
  const res = await fetch(`${BASE_URL}/quiz`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  })
  if (!res.ok) throw new Error('Failed to submit quiz')
  return res.json()
}