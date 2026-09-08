import { Link } from 'react-router-dom'

function QuestionCard({ question, selectedAnswer, onAnswer }) {
  return (
    <div className="w-full max-w-2xl space-y-4">
      
      {/* Assessment Guidance Banner */}
     <div className="flex items-center gap-4 rounded-2xl border border-indigo-200 bg-indigo-50/90 p-5 shadow-sm">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-sm">
          !
        </span>
        <div className="text-sm font-medium leading-relaxed text-slate-800 sm:text-base">
          <strong className="font-bold text-slate-900">Before you begin:</strong> This assessment recommends departments based on your interests and goals. We advise exploring the{' '}
          <Link to="/departments" className="font-bold text-indigo-600 underline hover:text-indigo-800">
            Department Profiles
          </Link>{' '}
          first before completing the questionnaire.
        </div>
      </div>

      {/* Main Question Card */}
      <div className="w-full rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-200/50 backdrop-blur-md transition-all sm:p-8">
        
        {/* Category Badge & Question Title */}
        <div className="mb-6 pb-4 border-b border-slate-100">
          <span className="inline-block rounded-md bg-indigo-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-600">
            Category: {question.category}
          </span>
          <h2 className="mt-3 font-['Space_Grotesk'] text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
            {question.text}
          </h2>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer?.text === option.text
         
            return (
              <button
                key={index}
                onClick={() => onAnswer(option)}
                className={`group flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/60 text-slate-900 shadow-md ring-2 ring-indigo-500/20'
                    : 'border-slate-200/80 bg-slate-50/50 text-slate-700 hover:border-slate-300 hover:bg-white hover:shadow-sm'
                }`}
              >
                {/* Radio Indicator */}
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-600'
                      : 'border-slate-300 bg-white group-hover:border-slate-400'
                  }`}
                >
                  {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>

                {/* Option Text */}
                <span className="font-['IBM_Plex_Sans'] text-sm font-medium leading-relaxed">
                  {option.text}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default QuestionCard