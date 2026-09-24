import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { getAllDepartments, submitFeedback } from '../services/api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Results() {
  {/* useLocation() is a hook from react-router-dom that returns the current location object.
     This object contains information about the current URL, including the pathname, search parameters, and state.
      In this case, we are using it to access the state passed from the previous page (Questionnaire.jsx) when navigating to the Results page. 
      The state contains the result of the quiz submission, which includes the top match and secondary matches for department recommendations. */}
  const location = useLocation() 
  const result = location.state?.result
  const [departments, setDepartments] = useState({})
  {/* The useState hook is used to create state variables for managing feedback form data and submission status.*/}
  const [feedbackChoice, setFeedbackChoice] = useState(null)
  const [feedbackComment, setFeedbackComment] = useState('')
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(() => sessionStorage.getItem('cci_feedback_submitted') === 'true')
  const [feedbackSaving, setFeedbackSaving] = useState(false)
  const [feedbackError, setFeedbackError] = useState('')

  useEffect(() => {
    if (!result) return

    getAllDepartments().then((data) => {
      setDepartments(Object.fromEntries(data.map((department) => [department.code, department])))
    }).catch((error) => console.error('Failed to load departments:', error))
  }, [result])

  if (!result) {
    return (
      <main className="flex min-h-screen flex-col justify-between bg-slate-50 font-['IBM_Plex_Sans'] text-slate-800 antialiased">
        <Navbar />
        <section className="flex flex-1 items-center justify-center px-6 py-20">
          <div className="w-full max-w-md rounded-3xl border border-slate-200/90 bg-white p-8 text-center shadow-xl shadow-slate-200/50 backdrop-blur-md">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 font-bold text-lg mb-4">
              ?
            </span>
            <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-slate-900">No Assessment Found</h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Please complete the assessment questionnaire first to see your personal department recommendation.
            </p>
            <Link
              to="/questionnaire"
              className="mt-6 inline-block w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-['IBM_Plex_Sans'] font-bold text-white shadow-lg transition-all hover:opacity-95 hover:shadow-xl hover:-translate-y-0.5"
            >
              Start Assessment →
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  const top = result.topMatch
  const secondary = result.secondaryMatches
  const topDept = departments[top.code] || top

  async function handleFeedbackSubmit(event) {
    event.preventDefault()
    if (feedbackChoice === null) return

    setFeedbackSaving(true)
    setFeedbackError('')
    try {
      await submitFeedback({
        matchedDepartmentCode: top.code,
        helpful: feedbackChoice,
        comment: feedbackComment.trim(),
      })
      sessionStorage.setItem('cci_feedback_submitted', 'true')
      setFeedbackSubmitted(true)
    } catch (error) {
      setFeedbackError(error.message)
    } finally {
      setFeedbackSaving(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 font-['IBM_Plex_Sans'] text-slate-800 antialiased">
      <Navbar />

      {/* Hero Recommendation Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-900 px-6 pt-24 pb-20 text-white text-center">
        <div className="mx-auto max-w-4xl">
          <span className="inline-block rounded-full bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-300 ring-1 ring-indigo-400/30">
            Assessment Results
          </span>
          <h1 className="mt-4 font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Your Match Recommendation
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-slate-300">
            Based on your problem-solving style, interests, and career goals across all six CCI departments.
          </p>
        </div>
      </section>

      {/* Main Top Match Card */}
      <section className="mx-auto max-w-4xl px-6 -mt-10 relative z-10">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 shadow-xl shadow-slate-200/50 backdrop-blur-md sm:p-12">
          {/* Top Brand Color Strip */}
          <div
            className="absolute top-0 left-0 right-0 h-2.5"
            style={{ backgroundColor: topDept.color }}
          />

          <div className="text-center">
            <span
              className="inline-block rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm"
              style={{ backgroundColor: topDept.color }}
            >
              Top Recommended Department
            </span>

            <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-bold text-slate-900 sm:text-5xl">
              {topDept.name}
            </h2>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 ring-1 ring-indigo-500/20">
              <span className="font-['Space_Grotesk'] text-xl font-bold text-indigo-600">
                {top.percent}%
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-900">
                Match Confidence
              </span>
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600">
              <strong className="text-slate-900 font-semibold">{top.explanation}</strong>
            </p>
          </div>

          {/* Breakdown Section Cards */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 border-t border-slate-100 pt-8">
            
            {/* Why Best Fit */}
            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                1. Why It Fits
              </span>
              <h3 className="mt-2 font-['Space_Grotesk'] text-lg font-bold text-slate-900">
                Core Synergy
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {top.explanation}
              </p>
            </div>

            {/* What You'll Encounter */}
            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                2. What You'll Do
              </span>
              <h3 className="mt-2 font-['Space_Grotesk'] text-lg font-bold text-slate-900">
                Curriculum Focus
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {topDept.overview || 'Department details are loading.'}
              </p>
            </div>

            {/* Opportunities */}
            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                3. Career Horizons
              </span>
              <h3 className="mt-2 font-['Space_Grotesk'] text-lg font-bold text-slate-900">
                Opportunities
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Graduates thrive in roles across software development, systems analysis, research, tech entrepreneurship, and industry leadership.
              </p>
            </div>

          </div>

          {/* Department Profile Callout */}
          <div className="mt-10 rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 p-6 text-white text-center sm:text-left sm:flex sm:items-center sm:justify-between">
            <div>
              <h4 className="font-['Space_Grotesk'] text-lg font-bold">
                Dive deeper into {topDept.name}
              </h4>
              <p className="mt-1 text-xs text-slate-300">
                Review faculty details, labs, specific career tracks, and full course profiles.
              </p>
            </div>
            <Link
              to={`/departments/${top.code}`}
              className="mt-4 sm:mt-0 inline-block shrink-0 rounded-xl bg-white px-6 py-3 font-['IBM_Plex_Sans'] text-sm font-bold text-slate-900 shadow-md transition-all hover:bg-slate-100 hover:shadow-lg"
            >
              Explore Profile →
            </Link>
          </div>
        </div>
      </section>

      {/* Secondary Matches */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-6 text-center sm:text-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
            Alternative Paths
          </span>
          <h2 className="mt-1 font-['Space_Grotesk'] text-2xl font-bold text-slate-900">
            Other Close Matches
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {secondary.map((m) => {
            const dept = departments[m.code] || { name: m.code, color: '#4f46e5' }
            return (
              <div
                key={m.code}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="inline-block rounded-md px-2 py-0.5 text-[10px] font-bold text-white"
                      style={{ backgroundColor: dept.color }}
                    >
                      {m.code}
                    </span>
                    <span className="font-['Space_Grotesk'] text-sm font-bold text-indigo-600">
                      {m.percent}% Match
                    </span>
                  </div>
                  <h3 className="mt-3 font-['Space_Grotesk'] font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {dept.name}
                  </h3>
                </div>

                <Link
                  to={`/departments/${m.code}`}
                  className="mt-6 text-xs font-semibold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  View profile →
                </Link>
              </div>
            )
          })}
        </div>

        {/* Global Action Footer Buttons */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/compare"
            className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3.5 text-center font-['IBM_Plex_Sans'] font-bold text-white shadow-lg transition-all hover:opacity-95 hover:shadow-xl hover:-translate-y-0.5"
          >
            Compare All Departments
          </Link>
          <Link
            to="/questionnaire"
            className="w-full sm:w-auto rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-center font-['IBM_Plex_Sans'] font-semibold text-slate-700 shadow-xs transition-all hover:border-slate-400 hover:bg-slate-50"
          >
            Retake Assessment
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 pb-16">
        {feedbackSubmitted ? (
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-5 text-center text-sm font-semibold text-emerald-700">
            Thanks for your feedback.
          </p>
        ) : (
          <form onSubmit={handleFeedbackSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-slate-900">Was this recommendation helpful?</h2>
            <div className="mt-5 flex justify-center gap-3">
              <button
                type="button"
                aria-label="Yes, this recommendation was helpful"
                aria-pressed={feedbackChoice === true}
                onClick={() => setFeedbackChoice(true)}
                className={`rounded-xl border px-5 py-3 text-2xl transition ${feedbackChoice === true ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-emerald-300'}`}
              >
                👍
              </button>
              <button
                type="button"
                aria-label="No, this recommendation was not helpful"
                aria-pressed={feedbackChoice === false}
                onClick={() => setFeedbackChoice(false)}
                className={`rounded-xl border px-5 py-3 text-2xl transition ${feedbackChoice === false ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-red-300'}`}
              >
                👎
              </button>
            </div>
            <textarea
              value={feedbackComment}
              onChange={(event) => setFeedbackComment(event.target.value)}
              maxLength={500}
              rows={3}
              placeholder="Optional comment"
              className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-3 text-left text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
            {feedbackError && <p className="mt-3 text-left text-sm text-red-600">{feedbackError}</p>}
            <button
              type="submit"
              disabled={feedbackChoice === null || feedbackSaving}
              className="mt-4 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {feedbackSaving ? 'Sending...' : 'Send feedback'}
            </button>
          </form>
        )}
      </section>

      <Footer />
    </main>
  )
}

export default Results
