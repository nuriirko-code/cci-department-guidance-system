const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, options) {
  const response = await fetch(`${BASE_URL}${path}`, options)
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }

  return data
}

export function getAllDepartments() {
  return request('/departments')
}

export function getDepartment(code) {
  return request(`/departments/${code}`)
}

export function getQuestions() {
  return request('/questions')
}

export function submitQuiz(answers) {
  return request('/quiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  })
}
