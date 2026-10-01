import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllQuestionsForAdmin, updateQuestionCompetencies } from '../../services/api'
import { useAuth } from '../../context/useAuth'
import competencies from '../../data/competencies'

// This page closes the recommendation loop: department content alone is not enough, so admins must be able to assign the new department meaningful weights across existing questions.
function AdminQuestions() {
  const { logout } = useAuth()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  // Load full question documents because this editor changes  option meaning, not department-specific scores.
  useEffect(() => {
    let active = true
    getAllQuestionsForAdmin()
      .then((questionData) => {
        if (!active) return
        setQuestions(questionData)
      })
      .catch((requestError) => { if (active) setError(requestError.message) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  // Keep competency tag edits local until save so accidental checkbox changes do not immediately alter the live assessment.
  function toggleCompetency(questionId, optionIndex, competency, checked) {
    setQuestions((current) => current.map((question) => {
      if (question._id !== questionId) return question
      const options = question.options.map((option, index) => {
        if (index !== optionIndex) return option
        const tags = new Set(option.competencies || [])
        if (checked) tags.add(competency)
        else tags.delete(competency)
        return { ...option, competencies: [...tags] }
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
      const saved = await updateQuestionCompetencies(question._id, question.options)
      setQuestions((current) => current.map((item) => item._id === saved._id ? saved : item))
      setNotice(`Competency tags saved for question ${question.id}.`)
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
           <Link to="/admin/dashboard" className="rounded-xl border border-indigo-200 bg-white px-5 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50">Back to dashboard</Link>
          <button onClick={logout} className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800">Log out</button>
        </div>
      </header>

    

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8"><p className="text-sm font-semibold text-indigo-600">Admin control</p><h2 className="mt-1 font-['Space_Grotesk'] text-3xl font-bold text-slate-950">Manage assessment competencies</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">Tag what each answer measures. Department recommendations are derived from these tags and each department&apos;s documented competency profile.</p></div>
        {notice && <p className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{notice}</p>}
        {error && <p className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        {loading ? <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500">Loading scoring rules...</div> : <div className="space-y-6">{questions.map((question) => <QuestionEditor key={question._id} question={question} saving={savingId === question._id} competencies={competencies} onChange={toggleCompetency} onSave={saveQuestion} />)}</div>}
      </div>
    </main>
  )
}

// This editor tags what each option measures; final department scores are derived later from the department competency profiles.
function QuestionEditor({ question, saving, competencies: competencyChoices, onChange, onSave }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-5"><p className="font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider text-indigo-600">Question {question.id} · {question.category}</p><h3 className="mt-2 font-['Space_Grotesk'] text-xl font-bold text-slate-950">{question.text}</h3></div>
      <div className="space-y-5 p-6">
        {question.options.map((option, optionIndex) => (
          <fieldset key={`${question._id}-${optionIndex}`} className="rounded-xl border border-slate-200 p-4">
            <legend className="px-2 text-sm font-semibold text-slate-800">{option.text}</legend>
            {(!option.competencies || option.competencies.length === 0) && <p className="mb-2 text-xs font-semibold text-amber-700">No competencies assigned; review this option before relying on its score.</p>}
            <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {competencyChoices.map((competency) => (
                <label key={competency.key} className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={(option.competencies || []).includes(competency.key)}
                    onChange={(event) => onChange(question._id, optionIndex, competency.key, event.target.checked)}
                    className="h-4 w-4 accent-indigo-600"
                  />
                  {competency.label}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <div className="flex justify-end">
          <button onClick={() => onSave(question)} disabled={saving} className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">{saving ? 'Saving...' : 'Save competency tags'}</button>
        </div>
      </div>
    </section>
  )
}

export default AdminQuestions
