const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, options) {
  const token = localStorage.getItem('cci_admin_token')
  const headers = new Headers(options?.headers)
  if (token) headers.set('Authorization', `Bearer ${token}`)
  if (options?.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json')

  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }

  return data
}

export function getAllDepartments() {
  return request('/departments')
}

export function loginAdmin(credentials) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
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

export function submitQuiz(answers) {
  return request('/quiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  })
}
