function About() {
  const stats = [
    { stat: '55.8%', label: 'felt confident choosing, before this tool existed' },
    { stat: '97.7%', label: 'said they would use a guided recommendation' },
    { stat: '6', label: 'CCI departments covered, HOD-verified' },
  ]
  return (
    <section className="bg-[#F4F6FB] px-6 py-20">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-10 shadow-xl shadow-black/5 sm:p-14">
        <p className="mb-4 text-center font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.2em] text-[#5B7FFF]">
          Why we built this
        </p>
        <h2 className="text-center font-['Space_Grotesk'] text-3xl font-semibold text-[#10162B] sm:text-4xl">
          Department choice shouldn't be a guess
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center font-['IBM_Plex_Sans'] text-lg leading-8 text-[#5B6478]">
          In a survey of 43 CCI students, fewer than half felt confident they understood the real differences between departments before choosing — and nearly all said they'd use a tool built specifically for Haramaya's programs.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="group cursor-default rounded-2xl border border-[#E8EBF3] bg-[#FAFBFD] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#5B7FFF]/30 hover:shadow-lg"
            >
              <p className="font-['Space_Grotesk'] text-3xl font-semibold text-[#10162B] transition group-hover:text-[#5B7FFF]">
                {item.stat}
              </p>
              <p className="mt-2 font-['IBM_Plex_Sans'] text-sm text-[#5B6478]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default About