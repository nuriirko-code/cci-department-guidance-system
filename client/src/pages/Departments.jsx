import { Link } from 'react-router-dom'
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

const ORDER = ['CS', 'SWE', 'IT', 'IS', 'ISC', 'STAT']

function Departments() {
  return (
    <main className="min-h-screen bg-slate-50 font-['IBM_Plex_Sans'] text-slate-800 antialiased">
      <Navbar />

      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-900 px-6 pt-24 pb-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <Avatar name="Afendi Abdi" photo="./images/cci-dean.png" size="mx-auto h-24 w-24 ring-4 ring-indigo-400/30" />
          <span className="mt-6 inline-block rounded-full bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-300 ring-1 ring-indigo-400/30">
            A message from the Dean
          </span>
          <h1 className="mt-4 font-['Space_Grotesk'] text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Welcome to the College of Computing and Informatics
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Before choosing a path, get to know the college itself — where it came from, how it's structured, and what student life looks like here.
          </p>
        </div>
      </section>

      {/* Overview Grid Section */}
      <section className="mx-auto max-w-7xl px-6 -mt-10 mb-20 relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          
          {/* History Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-md transition-all hover:shadow-2xl sm:p-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Our History</span>
            <h2 className="mt-2 font-['Space_Grotesk'] text-2xl font-bold text-slate-900">How CCI came to be</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              The Faculty of Computing and Informatics was established during the 2008/09 academic year alongside Applied Sciences. Reorganized into ten colleges, CCI is now home to six departments training Ethiopia's next generation of tech leaders.
            </p>
          </div>

          {/* Leadership Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-md transition-all hover:shadow-2xl sm:p-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Leadership & Structure</span>
            <h2 className="mt-2 font-['Space_Grotesk'] text-2xl font-bold text-slate-900">How the college is organized</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              CCI is led by a College Dean overseeing six specialized departments—Computer Science, Software Engineering, IT, IS, Information Science, and Statistics—each headed by its own HOD and batch advisors.
            </p>
          </div>

        </div>

        {/* Banner Image & Beyond Classroom Split Section */}
        <div className="mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50 lg:p-8">
          <div className="overflow-hidden rounded-2xl lg:col-span-7">
            <img
              src="/images/image.png"
              alt="College of Computing and Informatics"
              className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-80"
            />
          </div>
          <div className="lg:col-span-5 lg:px-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Beyond the Classroom</span>
            <h2 className="mt-2 font-['Space_Grotesk'] text-2xl font-bold text-slate-900">Student life at CCI</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Students across all departments actively engage in cybersecurity hackathons, coding competitions, developer clubs, collaborative projects, and industry internships to build practical expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Floating Department Cards Section */}
      <section className="bg-slate-900 px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">The Departments</span>
            <h2 className="mt-2 font-['Space_Grotesk'] text-3xl font-bold text-white sm:text-4xl">Explore each academic path</h2>
            <p className="mt-3 text-slate-400 text-sm max-w-lg mx-auto">Listed in order of origin and specialization.</p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ORDER.map((code) => {
              const dept = departments[code]
              return (
                <Link
                  key={code}
                  to={`/departments/${code}`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-800/60 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/50 hover:bg-slate-800 hover:shadow-2xl hover:shadow-indigo-500/10"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={dept.hod?.name} photo={dept.hod?.photo} size="h-12 w-12" />
                        <div>
                          <h3 className="font-['Space_Grotesk'] font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">
                            {dept.name}
                          </h3>
                          <span className="inline-block text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                            {dept.verified === 'hod' ? '✓ HOD-verified' : 'General reference'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-slate-300">
                      Best suited for students with {dept.blurb}.
                    </p>
                  </div>

                  <div className="mt-6 flex items-center text-sm font-semibold text-indigo-400 transition-transform group-hover:translate-x-1">
                    Explore department <span className="ml-1 text-lg">→</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Departments