import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllDepartments } from '../services/api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ROWS = [
  { key: 'overview', label: 'Focus' },
  { key: 'duration', label: 'Duration' },
  { key: 'skillsNeeded', label: 'Good fit if you...', list: true },
  { key: 'facilities', label: 'Facilities' },
  { key: 'careerPaths', label: 'Career paths', list: true },
  { key: 'marketDemand', label: 'Market demand' },
]

function Cell({ dept, row }) {
  const value = dept[row.key]
  if (row.list) {
    return (
      <div className="flex flex-wrap gap-1.5 pt-0.5">
        {value.map((v) => (
          <span
            key={v}
            className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 shadow-2xs"
          >
            {v}
          </span>
        ))}
      </div>
    )
  }
  return <span className="text-slate-600 leading-relaxed">{value}</span>
}

function Comparison() {
  const [departments, setDepartments] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(['CS', 'SWE'])

  useEffect(() => {
    getAllDepartments()
      .then((data) => setDepartments(Object.fromEntries(data.map((department) => [department.code, department]))))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [])

  const codes = Object.keys(departments)

  function toggle(code) {
    setSelected((prev) => {
      if (prev.includes(code)) {
        if (prev.length <= 2) return prev // Keep at least 2 selected
        return prev.filter((c) => c !== code)
      }
      if (prev.length >= 4) return prev // Cap at 4 for readable layout
      return [...prev, code]
    })
  }

  const gridCols =
    selected.length === 2
      ? 'sm:grid-cols-2 max-w-4xl'
      : selected.length === 3
      ? 'sm:grid-cols-3 max-w-6xl'
      : 'sm:grid-cols-4 max-w-7xl'

  if (loading) return <p className="p-10 text-center">Loading departments...</p>
  if (error) return <p className="p-10 text-center">Unable to load departments: {error}</p>

  return (
    <main className="min-h-screen bg-slate-50 font-['IBM_Plex_Sans'] text-slate-800 antialiased">
      <Navbar />

      {/* Header & Filter Selection */}
      <section className="px-6 pt-16 pb-12 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
          Compare Departments
        </span>
        <h1 className="mt-2 font-['Space_Grotesk'] text-3xl font-bold text-slate-900 sm:text-4xl">
          Weigh your options side by side
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-slate-600">
          Pick 2 to 4 departments to compare across key academic criteria.
        </p>

        {/* Department Selector Pills */}
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {codes.map((code) => {
            const isOn = selected.includes(code)
            const dept = departments[code]
            return (
              <button
                key={code}
                onClick={() => toggle(code)}
                className={`relative flex items-center gap-2 rounded-full border px-4 py-2 font-['Space_Grotesk'] text-xs font-semibold transition-all duration-200 ${
                  isOn
                    ? 'border-slate-300 bg-white text-slate-900 shadow-md ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-slate-100/80 text-slate-500 hover:border-slate-300 hover:bg-white'
                }`}
              >
                {/* Department Brand Color Dot */}
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: dept.color }}
                />
                {dept.name}
              </button>
            )
          })}
        </div>
      </section>

      {/* Side-by-Side Comparison Grid */}
      <section className="px-6 pb-24">
        <div className={`mx-auto grid grid-cols-1 gap-6 ${gridCols}`}>
          {selected.map((code) => {
            const dept = departments[code]
            return (
              <div
                key={code}
                className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-200/50 backdrop-blur-md transition-all hover:shadow-2xl sm:p-8"
              >
                {/* Color Stripe Bar at Top */}
                <div
                  className="absolute top-0 left-0 right-0 h-2"
                  style={{ backgroundColor: dept.color }}
                />

                <div>
                  {/* Department Card Header */}
                  <div className="pb-6 border-b border-slate-100">
                    <span
                      className="inline-block rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
                      style={{ backgroundColor: dept.color }}
                    >
                      {code}
                    </span>
                    <h2 className="mt-2 font-['Space_Grotesk'] text-2xl font-bold text-slate-900">
                      {dept.name}
                    </h2>
                  </div>

                  {/* Criteria Rows */}
                  <div className="divide-y divide-slate-100">
                    {ROWS.map((row) => (
                      <div key={row.key} className="py-4">
                        <p className="font-['IBM_Plex_Mono'] text-[11px] font-semibold uppercase tracking-wider text-indigo-600">
                          {row.label}
                        </p>
                        <div className="mt-1.5 text-sm font-normal">
                          <Cell dept={dept} row={row} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Profile Link Footer */}
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <Link
                    to={`/departments/${code}`}
                    className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-semibold text-slate-800 transition-all hover:border-indigo-500/30 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    Full profile →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Global CTA */}
        <div className="mx-auto mt-16 max-w-xl text-center">
          <p className="text-sm text-slate-500 mb-4">Still undecided after comparing?</p>
          <Link
            to="/questionnaire"
            className="inline-block rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 font-['IBM_Plex_Sans'] font-bold text-white shadow-xl transition-all hover:opacity-95 hover:shadow-2xl hover:-translate-y-0.5"
          >
            Take the assessment →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Comparison
