import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

function AdminLogin() {
  //Authentication office, give me the current authentication status and the login function.
  const { isAuthenticated, login } = useAuth()
  // navigate is a function that allows us to programmatically navigate to a different route. location is an object that represents the current URL. We can use it to get the state that was passed to the login page when the user was redirected there.
  const navigate = useNavigate()
  const location = useLocation()
  // credentials are login form's memory,
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
// if admin is already logged in, redirect to dashboard. This is useful if the user refreshes the page while on the login page.
  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard', { replace: true })
  }, [isAuthenticated, navigate])

  function updateField(event) {
    setCredentials((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    //Don't perform the browser's default form submission. I'll handle it with JavaScript. 
    event.preventDefault()
    // suppose admin enetered wrong password and get invalid credentials error, then admin corrects the credentials and submits again. We want to clear the previous error message before attempting to log in again.
    setError('')
    setSaving(true)
    try {
      // when this executes, the admin login component is saying "Authentication office, please authenticate these credentials.
      await login(credentials)
      // if the login is successful, the admin login component is saying "Authentication office, please navigate to the dashboard page. If the user was redirected to the login page from another page, navigate back to that page instead."
      navigate(location.state?.from || '/admin/dashboard', { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 font-['IBM_Plex_Sans'] text-slate-800">
      <section className="w-full max-w-md rounded-3xl border border-slate-800 bg-white p-8 shadow-2xl sm:p-10">
        <div className="mb-8">
          <p className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">CCI Guidance</p>
          <h1 className="mt-3 font-['Space_Grotesk'] text-3xl font-bold text-slate-950">Admin sign in</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">Manage the department profiles used across the guidance system.</p>
        </div>

        {error && <p className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block text-sm font-semibold text-slate-700">
            Username
            <input
              name="username"
              value={credentials.username}
              onChange={updateField}
              required
              autoComplete="username"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            Password
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={updateField}
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </label>
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default AdminLogin
