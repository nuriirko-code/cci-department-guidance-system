import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0B1220] px-6 pb-24 pt-16 sm:pt-24">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#5B7FFF]/20 to-[#9B6BFF]/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="mb-4 font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.2em] text-[#8FA0FF]">
            College of Computing and Informatics
          </p>
          <h1 className="font-['Space_Grotesk'] text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
            Find your
            <span className="block bg-gradient-to-r from-[#7C9CFF] to-[#B18CFF] bg-clip-text text-transparent">
              best-fit department
            </span>
          </h1>
          <p className="mt-6 max-w-lg font-['IBM_Plex_Sans'] text-lg leading-8 text-[#9AA3B8]">
            A short, structured assessment matches your interests and skills to CS, SWE, IT, IS, ISC, or Statistics — built on criteria verified directly by Haramaya's department heads.
          </p>
          <Link to="/questionnaire" className="mt-8 inline-block rounded-xl bg-gradient-to-r from-[#5B7FFF] to-[#9B6BFF] px-8 py-4 font-['IBM_Plex_Sans'] font-semibold text-white shadow-lg shadow-[#5B7FFF]/20 transition hover:opacity-90">
            Start Assessment →
          </Link>
          <div className="mt-6 flex gap-6 font-['IBM_Plex_Sans'] text-sm text-[#6B7488]">
            <span>15–20 questions</span>
            <span>~8 minutes</span>
            <span>6 departments</span>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-white/10 bg-[#141D33] p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between font-['IBM_Plex_Mono'] text-xs text-[#6B7488]">
              <span>QUESTION 3 / 18</span>
              <span>17%</span>
            </div>
            <div className="mb-5 h-1.5 rounded-full bg-white/10">
              <div className="h-1.5 w-[17%] rounded-full bg-gradient-to-r from-[#5B7FFF] to-[#9B6BFF]" />
            </div>
            <p className="mb-4 font-['IBM_Plex_Sans'] font-medium text-white">
             Which activity interests you the most?
            </p>
            <div className="space-y-2">
              {['Building and managing technology systems', 'Designing and developing software', 'Solving computing and programming problems'].map((opt, i) => (
                <div key={opt} className={`rounded-lg border p-3 font-['IBM_Plex_Sans'] text-sm ${i === 2 ? 'border-[#7C9CFF]/50 bg-[#7C9CFF]/10 text-[#B4C4FF]' : 'border-white/10 text-[#9AA3B8]'}`}>
                  {opt}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-xl border border-white/10 bg-[#141D33] p-4 shadow-2xl">
            <p className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-wider text-[#6B7488]">Top Match</p>
            <p className="bg-gradient-to-r from-[#7C9CFF] to-[#B18CFF] bg-clip-text font-['Space_Grotesk'] text-lg font-semibold text-transparent">
              Computer Science — 92%
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Hero