const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, options = {}) {
  const { skipAuth, ...fetchOptions } = options
  const token = localStorage.getItem('adminToken')
  const headers = new Headers(fetchOptions.headers)
  if (token && !skipAuth) headers.set('Authorization', `Bearer ${token}`)
  if (fetchOptions.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json')

  const response = await fetch(`${BASE_URL}${path}`, { ...fetchOptions, headers })
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }

  return data
}

export function getAllDepartments() {
  return request('/departments')
}

export function adminLogin(username, password) {
  return request('/auth/login', {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify({ username, password }),
  })
}

export function createDepartment(department) {
  return request('/departments', {
    method: 'POST',
    body: JSON.stringify(department),
  })
}

export function updateDepartment(id, department) {
  return request(`/departments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(department),
  })
}

export function deleteDepartment(id) {
  return request(`/departments/${id}`, { method: 'DELETE' })
}

export function getDepartment(code) {
  return request(`/departments/${code}`)
}

export function getQuestions() {
  return request('/questions')
}

// The admin scoring screen needs the complete question documents, including every option's editable weights.
export function getAllQuestionsForAdmin() {
  return request('/questions/admin')
}

// Saving options through this authenticated call is what lets an admin make a new department part of recommendations.
export function updateQuestionWeights(id, options) {
  return request(`/questions/${id}/weights`, {
    method: 'PUT',
    body: JSON.stringify({ options }),
  })
}

export function submitQuiz(answers) {
  return request('/quiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  })
}

export function submitFeedback(feedback) {
  return request('/feedback', {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify(feedback),
  })
}

export function getAllFeedback() {
  return request('/feedback')
}
