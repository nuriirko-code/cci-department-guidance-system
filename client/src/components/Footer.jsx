import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-[#1B3058] px-6 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 border-b border-white/10 pb-10 sm:grid-cols-4">
        <div className="sm:col-span-2">
          <p className="font-['Space_Grotesk'] text-lg font-semibold text-white">CCI Guidance</p>
          <p className="mt-3 max-w-sm font-['IBM_Plex_Sans'] text-sm leading-6 text-[#AAB6D6]">
            Built by CS students during industrial internship, in partnership with the ICT Directorate, Haramaya University — helping CCI students choose with confidence.
          </p>
        </div>

        <div className="flex flex-col gap-2 font-['IBM_Plex_Sans'] text-sm text-[#AAB6D6]">
          <span className="mb-1 font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-[#AAB6D6]">Explore</span>
          <Link to="/departments" className="transition hover:text-white">Departments</Link>
          <Link to="/compare" className="transition hover:text-white">Compare</Link>
          <Link to="/questionnaire" className="transition hover:text-white">Start Assessment</Link>
        </div>

        <div className="flex flex-col gap-2 font-['IBM_Plex_Sans'] text-sm text-[#9AA3B8]">
          <span className="mb-1 font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-[#6B7488]">Contact</span>
          <a href="mailto:cci.guidance@haramaya.edu.et" className="transition hover:text-white">cci.guidance@haramaya.edu.et</a>
          <span>ICT Directorate, Haramaya University</span>
          <span>Haramaya, Oromia, Ethiopia</span>
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-7xl font-['IBM_Plex_Mono'] text-xs text-[#4B5468]">
        © 2026 CCI Department Guidance System — Haramaya University. Built during industrial internship.
      </p>
    </footer>
  )
}
export default Footer