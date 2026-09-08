function HowItWorks() {
  const steps = [
    { n: '01', title: 'Answer honestly', text: 'Respond to 15–20 short questions about how you think, work, and want to grow.' },
    { n: '02', title: 'Get scored', text: "Your answers are weighed against real criteria from each department's head." },
    { n: '03', title: 'See your fit', text: 'Get a top match with a clear explanation — plus how it compares to the rest.' },
  ]
  return (
    <section className="bg-[#10192E] px-6 py-20">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-[#141D33] p-10 shadow-2xl sm:p-14">
        <p className="mb-4 text-center font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.2em] text-[#8FA0FF]">
          How it works
        </p>
        <h2 className="text-center font-['Space_Grotesk'] text-3xl font-semibold text-white sm:text-4xl">
          Three steps to your match
        </h2>

        <div className="relative mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.n}
              className="group cursor-default rounded-2xl border border-white/10 bg-[#0F1729] p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-[#7C9CFF]/40 hover:bg-[#141D40]"
            >
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#141D33] font-['IBM_Plex_Mono'] text-sm text-[#B4C4FF] transition group-hover:border-[#7C9CFF]/50">
                {step.n}
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 font-['IBM_Plex_Sans'] text-sm leading-6 text-[#9AA3B8]">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default HowItWorks