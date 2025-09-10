import React from "react";
import SpiralLogo from "./components/SpiralLogo";

// StudentPreview: Shows the quiz as a student would see it
function StudentPreview({ questions }) {
  // Only keep questions that have all required fields
  const validQuestions = Array.isArray(questions)
    ? questions.filter(
        q =>
          q &&
          typeof q.question === "string" &&
          Array.isArray(q.options) &&
          typeof q.answer_idx === "number"
      )
    : [];

  // State for selected answers, whether quiz is submitted, and current question
  const [answers, setAnswers] = React.useState([]);
  const [submitted, setSubmitted] = React.useState(false);
  const [current, setCurrent] = React.useState(0);

  // Reset answers and state when questions change
  React.useEffect(() => {
    setAnswers(Array(validQuestions.length).fill(null));
    setSubmitted(false);
    setCurrent(0);
  }, [validQuestions.length]);

  // When a student selects an option
  const handleSelect = oIdx => {
    const updated = [...answers];
    updated[current] = oIdx;
    setAnswers(updated);
  };

  // Go to next question
  const handleNext = () => {
    if (current < validQuestions.length - 1) setCurrent(current + 1);
  };

  // Go to previous question
  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  // Submit the quiz
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Calculate score (number of correct answers)
  const score = answers.reduce(
    (acc, ans, idx) =>
      ans === validQuestions[idx]?.answer_idx ? acc + 1 : acc,
    0
  );

  // If there are no questions, show a message
  if (validQuestions.length === 0) {
    return (
      <div className="w-full flex justify-center pt-20">
        <p className="text-lg text-gray-500">
          No questions yet. Generate a quiz first.
        </p>
      </div>
    );
  }

  // Main student preview UI
  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-4 pb-8 px-0 bg-orange-50">
      {/* Progress bar at the top */}
      <div className="w-full max-w-xl mx-auto mt-4 mb-6 px-2 sm:px-4">
        <div className="w-full h-6 bg-orange-100 rounded-full relative overflow-hidden flex items-center">
          {/* Orange bar shows progress or score */}
          <div
            className="absolute top-0 left-0 h-6 bg-orange-500 rounded-full transition-all"
            style={{ width: `${((submitted ? score : current + 1) / validQuestions.length) * 100}%` }}
          />
          {/* Orange circle at current position */}
          <div
            className="absolute top-0 left-0 h-6 w-6 bg-orange-500 rounded-full border-2 border-white shadow"
            style={{ left: `calc(${((submitted ? score : current) / validQuestions.length) * 100}% - 12px)` }}
          />
          {/* Progress text left/right */}
          <div className="relative z-10 w-full flex justify-between px-4 text-xs sm:text-sm font-semibold text-gray-700">
            <span>{submitted ? 'Score' : `Question ${current + 1}`}</span>
            <span>{submitted ? `${score} / ${validQuestions.length}` : `${Math.round(((current + 1) / validQuestions.length) * 100)}%`}</span>
          </div>
        </div>
      </div>
      {/* Main quiz card: question and options, or score at end */}
      <form onSubmit={handleSubmit} className="w-full max-w-xl flex-1 flex flex-col justify-center items-center px-2 sm:px-4">
        <div className="bg-white border border-orange-100 rounded-3xl p-4 sm:p-8 md:p-12 shadow-md w-full min-h-[340px] flex flex-col justify-between">
          {/* If quiz not submitted, show question and options */}
          {!submitted ? (
            <>
              <div>
                {/* Question header and progress */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    Question {current + 1}
                  </div>
                  <div className="text-base text-gray-500 font-semibold">
                    {answers.filter(a => a !== null).length} / {validQuestions.length} answered
                  </div>
                </div>
                {/* Question text */}
                <div className="mb-6 text-lg sm:text-xl font-semibold text-gray-800 break-words leading-relaxed">
                  {validQuestions[current].question}
                </div>
                {/* List of answer options */}
                <div className="flex flex-col gap-4 sm:gap-6 mb-6">
                  {validQuestions[current].options.map((opt, oIdx) => (
                    <label
                      key={opt.id || oIdx}
                      className={`flex flex-row items-center gap-3 bg-orange-50 border border-gray-200 rounded-2xl px-4 py-4 cursor-pointer transition text-base sm:text-lg w-full font-medium ${
                        answers[current] === oIdx ? "border-orange-500 shadow-md bg-orange-100" : ""
                      }`}
                    >
                      {/* Radio button for selecting answer */}
                      <input
                        type="radio"
                        name={`q${current}`}
                        checked={answers[current] === oIdx}
                        disabled={submitted}
                        onChange={() => handleSelect(oIdx)}
                        className="accent-orange-500 w-6 h-6 mr-3"
                      />
                      {/* Option text */}
                      <span className="text-base sm:text-lg text-gray-800 break-words">
                        {typeof opt === "object" ? opt.text : opt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Navigation buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4 w-full">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={current === 0 || submitted}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gray-100 text-gray-500 font-bold shadow disabled:opacity-50 text-lg sm:text-xl"
                >
                  Previous
                </button>
                {current < validQuestions.length - 1 && !submitted ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={answers[current] === null}
                    className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-orange-200 text-orange-700 font-bold shadow disabled:opacity-50 text-lg sm:text-xl"
                  >
                    Next
                  </button>
                ) : !submitted ? (
                  <button
                    type="submit"
                    disabled={answers[current] === null}
                    className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-orange-500 text-white font-bold shadow disabled:opacity-50 text-lg sm:text-xl"
                  >
                    Submit
                  </button>
                ) : null}
              </div>
            </>
          ) : (
            // If quiz is submitted, show score and retake button
            <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
              <div className="text-3xl sm:text-4xl font-extrabold text-green-600 mb-4 text-center">Quiz Complete!</div>
              <div className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 text-center">Your Score</div>
              <div className="text-5xl sm:text-6xl font-extrabold text-orange-500 mb-6 text-center">{score} / {validQuestions.length}</div>
              <div className="w-full flex justify-center">
                {/* Retake Quiz button resets everything */}
                <button
                  type="button"
                  onClick={() => {
                    setAnswers(Array(validQuestions.length).fill(null));
                    setSubmitted(false);
                    setCurrent(0);
                  }}
                  className="px-8 py-4 rounded-2xl bg-orange-500 text-white font-bold shadow hover:bg-orange-600 transition text-lg sm:text-xl"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
export default StudentPreview;