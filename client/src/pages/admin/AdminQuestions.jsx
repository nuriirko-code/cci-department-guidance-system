import { useEffect, useState } from 'react'
import { getAllDepartments, getAllQuestionsForAdmin, updateQuestionWeights } from '../../services/api'
import { useAuth } from '../../context/useAuth'

// This page closes the recommendation loop: department content alone is not enough, so admins must be able to assign the new department meaningful weights across existing questions.
function AdminQuestions() {
  const { logout } = useAuth()
  const [departments, setDepartments] = useState([])
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  // Load departments and full question weights together so the editor always has live columns and current scoring data.
  useEffect(() => {
    let active = true
    Promise.all([getAllDepartments(), getAllQuestionsForAdmin()])
      .then(([departmentData, questionData]) => {
        if (!active) return
        setDepartments(departmentData.sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER)))
        setQuestions(questionData)
      })
      .catch((requestError) => { if (active) setError(requestError.message) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  // Keep edits local until the admin explicitly saves one question, preventing half-edited weights from reaching MongoDB.
  function changeWeight(questionId, optionIndex, departmentCode, value) {
    const parsedValue = value === '' ? 0 : Number(value)
    setQuestions((current) => current.map((question) => {
      if (question._id !== questionId) return question
      const options = question.options.map((option, index) => {
        if (index !== optionIndex) return option
        return { ...option, weights: { ...option.weights, [departmentCode]: Number.isFinite(parsedValue) ? parsedValue : 0 } }
      })
      return { ...question, options }
    }))
  }

  // Persist one complete question's options and then replace the local copy with the server response.
  async function saveQuestion(question) {
    setSavingId(question._id)
    setError('')
    setNotice('')
    try {
      const saved = await updateQuestionWeights(question._id, question.options)
      setQuestions((current) => current.map((item) => item._id === saved._id ? saved : item))
      setNotice(`Weights saved for question ${question.id}.`)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSavingId(null)
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 font-['IBM_Plex_Sans'] text-slate-800">
      <header className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div><p className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.2em] text-indigo-300">CCI Guidance</p><h1 className="mt-1 font-['Space_Grotesk'] text-xl font-bold">Assessment scoring</h1></div>
          <button onClick={logout} className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800">Log out</button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8"><p className="text-sm font-semibold text-indigo-600">Admin control</p><h2 className="mt-1 font-['Space_Grotesk'] text-3xl font-bold text-slate-950">Manage assessment scoring</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">Assign a numeric weight to each current department for every answer. A newly added department becomes recommendable only after it receives meaningful weights here.</p></div>
        {notice && <p className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{notice}</p>}
        {error && <p className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        {loading ? <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500">Loading scoring rules...</div> : <div className="space-y-6">{questions.map((question) => <QuestionEditor key={question._id} question={question} departments={departments} saving={savingId === question._id} onChange={changeWeight} onSave={saveQuestion} />)}</div>}
      </div>
    </main>
  )
}

// This editor creates one input per live department, so adding a department changes the scoring controls without a frontend code change.
function QuestionEditor({ question, departments, saving, onChange, onSave }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-5"><p className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-indigo-600">Question {question.id} · {question.category}</p><h3 className="mt-2 font-['Space_Grotesk'] text-xl font-bold text-slate-950">{question.text}</h3></div>
      <div className="overflow-x-auto p-6"><table className="min-w-[48rem] w-full text-left text-sm"><thead><tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500"><th className="pb-3 pr-4">Answer option</th>{departments.map((department) => <th key={department.code} className="min-w-20 pb-3 px-2 text-center">{department.code}</th>)}<th className="pb-3 pl-4 text-right">Save</th></tr></thead><tbody className="divide-y divide-slate-100">{question.options.map((option, optionIndex) => <tr key={`${question._id}-${optionIndex}`}><td className="py-4 pr-4 font-medium text-slate-700">{option.text}</td>{departments.map((department) => <td key={department.code} className="px-2 py-4"><input type="number" step="1" value={option.weights?.[department.code] ?? 0} onChange={(event) => onChange(question._id, optionIndex, department.code, event.target.value)} className="w-16 rounded-lg border border-slate-300 px-2 py-2 text-center outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" aria-label={`${question.text}, ${option.text}, ${department.code} weight`} /></td>)}{optionIndex === 0 && <td rowSpan={question.options.length} className="py-4 pl-4 text-right align-top"><button onClick={() => onSave(question)} disabled={saving} className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">{saving ? 'Saving...' : 'Save weights'}</button></td>}</tr>)}</tbody></table></div>
    </section>
  )
}

export default AdminQuestions
