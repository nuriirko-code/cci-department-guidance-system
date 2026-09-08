import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#1B3058] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-['Space_Grotesk'] text-lg font-semibold text-white">CCI Guidance</span>
          <span className="hidden text-xs text-[#AAB6D6] sm:inline">Haramaya University</span>
        </Link>
        <div className="flex items-center gap-6 font-['IBM_Plex_Sans'] text-sm font-medium text-[#AAB6D6]">
          <Link to="/departments" className="transition hover:text-white">Departments</Link>
          <Link to="/compare" className="transition hover:text-white">Compare</Link>
          <Link to="/questionnaire" className="rounded-lg bg-gradient-to-r from-[#5B7FFF] to-[#9B6BFF] px-4 py-2 text-white transition hover:opacity-90">
            Start Assessment
          </Link>
        </div>
      </div>
    </nav>
  )
}
export default Navbar