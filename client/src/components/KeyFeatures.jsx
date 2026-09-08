function KeyFeatures() {
  const features = [
    { title: 'Personalized quiz', text: 'No generic advice — every recommendation is scored from your own answers.' },
    { title: 'HOD-verified data', text: "Department profiles come directly from Haramaya's own department heads." },
    { title: 'Side-by-side comparison', text: 'Weigh all six departments against each other on shared criteria.' },
    { title: 'Explained, not just labeled', text: 'Every match comes with a plain-language reason it fits you.' },
  ]
  return (
    <section className="bg-[#EEF1F8] px-6 py-20">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-10 shadow-xl shadow-black/5 sm:p-14">
        <p className="mb-4 text-center font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.2em] text-[#5B7FFF]">
          Key features
        </p>
        <h2 className="text-center font-['Space_Grotesk'] text-3xl font-semibold text-[#10162B] sm:text-4xl">
          Built for Haramaya's CCI
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="group cursor-default rounded-2xl border border-[#E8EBF3] bg-[#FAFBFD] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#5B7FFF]/30 hover:shadow-lg"
            >
              <h3 className="font-['Space_Grotesk'] text-lg font-semibold text-[#10162B] transition group-hover:text-[#5B7FFF]">
                {f.title}
              </h3>
              <p className="mt-2 font-['IBM_Plex_Sans'] text-sm leading-6 text-[#5B6478]">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default KeyFeatures