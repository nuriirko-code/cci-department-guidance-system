import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import questions from '../data/mockQuestions'
import QuestionCard from '../components/QuestionCard'


function Questionnaire() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})// We're starting with an empty object because the student hasn't answered anything yet.
  const navigate = useNavigate()

  const currentQuestion = questions[currentIndex]

  function handleAnswer(answer) {
  setAnswers((previousAnswers) => ({
    ...previousAnswers,
    [currentQuestion.id]: answer,
  }))
}


  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } 
    else {


  navigate('/results', {
    state: {
      answers: answers,
    },
  })
}
}

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-2xl">

        {/* Progress */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">
              Question {currentIndex + 1} of {questions.length}
            </span>

            <span className="text-slate-500">
              {Math.round(((currentIndex + 1) / questions.length) * 100)}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Current question this is whete the parent sends information to the child*/}
        <QuestionCard 
        question={currentQuestion} 
        selectedAnswer={answers[currentQuestion.id]}   
        onAnswer={handleAnswer}   
        />



        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!answers[currentQuestion.id]}
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
           {currentIndex === questions.length -1 ? 'submit' : 'Next →'}
          </button>
        </div>

      </div>
    </main>
  )
}

export default Questionnaire