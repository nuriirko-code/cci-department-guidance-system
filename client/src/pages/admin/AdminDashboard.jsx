import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createDepartment, deleteDepartment, getAllDepartments, getAllFeedback, updateDepartment } from '../../services/api'
import { useAuth } from '../../context/useAuth'
import DepartmentForm from '../../components/admin/DepartmentForm'
import DepartmentTable from '../../components/admin/DepartmentTable'

function AdminDashboard() {
  const { logout } = useAuth()
  const [departments, setDepartments] = useState([])
  const [feedback, setFeedback] = useState([])
  const [selected, setSelected] = useState(null)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    let active = true
    //fetch all departments from database.
    Promise.all([getAllDepartments(), getAllFeedback()])
      .then(([departmentData, feedbackData]) => {
        if (active) {
          setDepartments(departmentData)
          setFeedback(feedbackData)
        }
      })
      .catch((requestError) => { if (active) setError(requestError.message) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  function beginCreate() {
    setEditing(null)
    setShowForm(true)
    setError('')
    setNotice('')
  }

  function beginEdit(department) {
    setEditing(department)
    setShowForm(true)
    //clear previous error.
    setError('')
    //clear previous notice.
    setNotice('')
  }

  async function saveDepartment(payload) {
    setSaving(true)
    setError('')
    try {
      const saved = editing ? await updateDepartment(editing._id, payload) : await createDepartment(payload)
      setDepartments((current) => editing ? current.map((item) => item._id === saved._id ? saved : item) : [...current, saved])
      setSelected(saved)
      setShowForm(false)
      setEditing(null)
      setNotice(editing ? 'Department updated successfully.' : 'Department created successfully.')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSaving(false)
    }
  }

  async function removeDepartment(department) {
    if (!window.confirm(`Delete ${department.name}? This cannot be undone.`)) return
    setError('')
    try {
      await deleteDepartment(department._id)
      setDepartments((current) => current.filter((item) => item._id !== department._id))
      if (selected?._id === department._id) setSelected(null)
      setNotice('Department deleted successfully.')
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 font-['IBM_Plex_Sans'] text-slate-800">
      <header className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div><p className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.2em] text-indigo-300">CCI Guidance</p><h1 className="mt-1 font-['Space_Grotesk'] text-xl font-bold">Department administration</h1></div>
          <Link to="/admin/questions" className="rounded-xl border border-indigo-200 bg-white px-5 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50">Manage assessment scoring</Link>
          <button onClick={logout} className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800">Log out</button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold text-indigo-600">Overview</p>
        <h2 className="mt-1 font-['Space_Grotesk'] text-3xl font-bold text-slate-950">Departments</h2><p className="mt-2 text-sm text-slate-500">The records below are shared directly with the student-facing application.</p></div><div className="flex flex-wrap gap-3"><Link to="/admin/questions" className="rounded-xl border border-indigo-200 bg-white px-5 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50">Manage assessment scoring</Link><button onClick={beginCreate} className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">+ Add department</button></div></div>
        {notice && <p className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{notice}</p>}
        {error && <p className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <div className="mb-8 grid gap-4 sm:grid-cols-3"><Metric label="Total departments" value={departments.length} /><Metric label="HOD verified" value={departments.filter((item) => item.verified === 'hod').length} /><Metric label="General profiles" value={departments.filter((item) => item.verified !== 'hod').length} /></div>

        {showForm ? <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="mb-6"><p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">{editing ? 'Edit record' : 'New record'}</p><h3 className="mt-1 font-['Space_Grotesk'] text-2xl font-bold text-slate-950">{editing ? `Update ${editing.name}` : 'Create department'}</h3></div><DepartmentForm key={editing?._id || 'new'} department={editing} onSubmit={saveDepartment} onCancel={() => setShowForm(false)} saving={saving} /></section> : null}

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>{loading ? <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500">Loading departments...</div> : <DepartmentTable departments={departments} selectedId={selected?._id} onSelect={setSelected} onEdit={beginEdit} onDelete={removeDepartment} />}</div>
          <DepartmentDetails department={selected} />
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Student voice</p>
              <h2 className="mt-1 font-['Space_Grotesk'] text-2xl font-bold text-slate-950">Recommendation feedback</h2>
            </div>
            <p className="text-sm text-slate-500">{feedback.length} response{feedback.length === 1 ? '' : 's'}</p>
          </div>
          {feedback.length === 0 ? (
            <p className="mt-6 rounded-xl border border-dashed border-slate-300 px-5 py-8 text-center text-sm text-slate-500">No student feedback has been submitted yet.</p>
          ) : (
            <div className="mt-6 divide-y divide-slate-100">
              {feedback.map((item) => (
                <article key={item._id} className="grid gap-3 py-5 sm:grid-cols-[8rem_8rem_minmax(0,1fr)_8rem] sm:items-start">
                  <span className="font-['IBM_Plex_Mono'] text-sm font-semibold text-slate-700">{item.matchedDepartmentCode}</span>
                  <span className={item.helpful ? 'font-semibold text-emerald-600' : 'font-semibold text-red-600'}>{item.helpful ? 'Helpful' : 'Not helpful'}</span>
                  <p className="text-sm leading-relaxed text-slate-600">{item.comment || 'No comment provided.'}</p>
                  <time className="text-xs text-slate-400 sm:text-right" dateTime={item.createdAt}>{new Date(item.createdAt).toLocaleDateString()}</time>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

function Metric({ label, value }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p><p className="mt-2 font-['Space_Grotesk'] text-3xl font-bold text-slate-950">{value}</p></div> }

function DepartmentDetails({ department }) {
  if (!department) return <aside className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm leading-relaxed text-slate-500">Select a department to view its details.</aside>
  return <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center gap-3"><span className="h-4 w-4 rounded-full" style={{ backgroundColor: department.color }} /><div><h3 className="font-['Space_Grotesk'] text-lg font-bold text-slate-950">{department.name}</h3><p className="font-['IBM_Plex_Mono'] text-xs text-slate-500">{department.code}</p></div></div><dl className="mt-6 space-y-4 text-sm"><Detail label="Verification" value={department.verified === 'hod' ? 'HOD verified' : 'General'} /><Detail label="HOD" value={department.hod?.name || 'Not assigned'} /><Detail label="Duration" value={department.duration || 'Not provided'} /><Detail label="Career paths" value={department.careerPaths?.join(', ') || 'Not provided'} /></dl><p className="mt-6 border-t border-slate-100 pt-5 text-sm leading-relaxed text-slate-600">{department.overview || 'No overview provided.'}</p></aside>
}

function Detail({ label, value }) { return <div><dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</dt><dd className="mt-1 text-slate-700">{value}</dd></div> }

export default AdminDashboard
