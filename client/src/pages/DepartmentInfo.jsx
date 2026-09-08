import { useParams, Link, Navigate } from 'react-router-dom'
import departments from '../data/departmentMeta'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Avatar({ name, photo, size = 'h-20 w-20' }) {
  if (photo) return <img src={photo} alt={name} className={`${size} rounded-full object-cover shadow-sm`} />
  const initials = name ? name.split(' ').map((n) => n[0]).slice(0, 2).join('') : '?'
  return (
    <div className={`${size} flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 font-['Space_Grotesk'] font-bold text-white shadow-md`}>
      {initials}
    </div>
  )
}

function TagList({ items, color }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center rounded-lg border border-indigo-500/20 bg-indigo-50/80 px-3 py-1.5 text-xs font-semibold text-indigo-900 shadow-sm transition-all hover:bg-indigo-100/80"
        >
          {item}
        </span>
      ))}
    </div>
  )
}

function DepartmentInfo() {
  const { code } = useParams()
  const dept = departments[code?.toUpperCase()]
  if (!dept) return <Navigate to="/departments" replace />

  return (
    <main className="min-h-screen bg-slate-50 font-['IBM_Plex_Sans'] text-slate-800 antialiased">
      <Navbar />

      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-900 px-6 pt-24 pb-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <Avatar name={dept.hod?.name} photo={dept.hod?.photo} size="mx-auto h-24 w-24 ring-4 ring-indigo-400/30" />
          
          <span className="mt-6 inline-block rounded-full bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-300 ring-1 ring-indigo-400/30">
            {dept.hod?.name ? `Head of Department: ${dept.hod.name}` : dept.verified === 'hod' ? 'HOD-Verified Profile' : 'General Reference Profile'}
          </span>

          <h1 className="mt-4 font-['Space_Grotesk'] text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {dept.name}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Best suited for students with {dept.blurb}.
          </p>
        </div>
      </section>

      {/* Primary Overview Grid Section */}
      <section className="mx-auto max-w-7xl px-6 -mt-10 mb-20 relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          
          {/* History Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-md transition-all hover:shadow-2xl sm:p-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">History</span>
            <h2 className="mt-2 font-['Space_Grotesk'] text-2xl font-bold text-slate-900">Where this department comes from</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              <strong className="font-semibold text-slate-900">Established:</strong> {dept.history.established}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{dept.history.origin}</p>
          </div>

          {/* Program Details Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-md transition-all hover:shadow-2xl sm:p-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Program</span>
            <h2 className="mt-2 font-['Space_Grotesk'] text-2xl font-bold text-slate-900">Duration, students & faculty</h2>
            <div className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
              <p><strong className="font-semibold text-slate-900">Duration:</strong> {dept.duration}</p>
              <p><strong className="font-semibold text-slate-900">Students:</strong> {dept.studentBody}</p>
              <p><strong className="font-semibold text-slate-900">Faculty:</strong> {dept.faculty}</p>
            </div>
          </div>

        </div>

        {/* Overview & Fit Section */}
        <div className="mt-8 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          
          {/* Study Overview Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/50 lg:col-span-7">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Overview</span>
            <h2 className="mt-2 font-['Space_Grotesk'] text-2xl font-bold text-slate-900">What you'll study</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{dept.overview}</p>
            
            <div className="mt-8 border-t border-slate-100 pt-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Facilities</span>
              <h3 className="mt-1 font-['Space_Grotesk'] text-lg font-bold text-slate-900">What's available to students</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{dept.facilities}</p>
            </div>
          </div>

          {/* Student Fit & Skill Tags */}
          <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/50 lg:col-span-5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Fit</span>
              <h2 className="mt-2 font-['Space_Grotesk'] text-2xl font-bold text-slate-900">Who tends to thrive here</h2>
              <div className="mt-6">
                <TagList items={dept.skillsNeeded} color={dept.color} />
              </div>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Beyond the Classroom</span>
              <h3 className="mt-1 font-['Space_Grotesk'] text-lg font-bold text-slate-900">Projects, clubs & competitions</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {dept.activities.map((a) => (
                  <li key={a} className="flex items-start gap-2">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Career & Postgraduate Section */}
      <section className="bg-slate-900 px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Careers & Opportunities</span>
            <h2 className="mt-2 font-['Space_Grotesk'] text-3xl font-bold text-white sm:text-4xl">Where {dept.name} leads you</h2>
            <p className="mt-3 text-slate-400 text-sm max-w-xl mx-auto">{dept.marketDemand}</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            
            {/* Career Paths Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-8 shadow-lg backdrop-blur-sm">
              <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">Popular Career Paths</h3>
              <div className="mt-6">
                <TagList items={dept.careerPaths} color={dept.color} />
              </div>
            </div>

            {/* Postgraduate Opportunities Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-8 shadow-lg backdrop-blur-sm">
              <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">Postgraduate Opportunities</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">{dept.postgrad}</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-['Space_Grotesk'] text-3xl font-bold sm:text-4xl">
            Think {dept.name} could be your fit?
          </h2>
          <p className="mt-3 text-indigo-100 text-base">
            Take our guided assessment to compare your skills and interest with all college options.
          </p>
          <Link
            to="/questionnaire"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-['IBM_Plex_Sans'] font-bold text-slate-900 shadow-xl transition-all hover:bg-slate-100 hover:shadow-2xl hover:-translate-y-0.5"
          >
            Take the assessment →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default DepartmentInfo