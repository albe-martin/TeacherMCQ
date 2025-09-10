import React from "react";
import SpiralLogo from "./components/SpiralLogo";

function StudentPreview({ questions }) {
  // Defensive: filter out any questions missing required fields
  const validQuestions = Array.isArray(questions)
    ? questions.filter(
        q =>
          q &&
          typeof q.question === "string" &&
          Array.isArray(q.options) &&
          typeof q.answer_idx === "number"
      )
    : [];

  const [answers, setAnswers] = React.useState([]);
  const [submitted, setSubmitted] = React.useState(false);
  const [current, setCurrent] = React.useState(0);

  // Reset state when questions change
  React.useEffect(() => {
    setAnswers(Array(validQuestions.length).fill(null));
    setSubmitted(false);
    setCurrent(0);
  }, [validQuestions.length]);

  const handleSelect = oIdx => {
    const updated = [...answers];
    updated[current] = oIdx;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (current < validQuestions.length - 1) setCurrent(current + 1);
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  const score = answers.reduce(
    (acc, ans, idx) =>
      ans === validQuestions[idx]?.answer_idx ? acc + 1 : acc,
    0
  );

  if (validQuestions.length === 0) {
    return (
      <div className="w-full flex justify-center pt-20">
        <p className="text-lg text-gray-500">
          No questions yet. Generate a quiz first.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-start pt-12 bg-transparent">
      <div className="flex gap-6 w-full max-w-full">
        {/* Progress Card - explorer sidebar style */}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 w-64 h-80 flex flex-col items-center shadow-sm mt-2">
          <div className="mb-3">
            <SpiralLogo size={36} />
          </div>
          <div className="text-lg font-bold text-gray-800 mb-3">Progress</div>
          <div className="mb-5 text-base font-medium text-gray-700">
            Question {current + 1} of {validQuestions.length}{" "}
            <span className="ml-2">
              {Math.round(
                ((current + 1) / validQuestions.length) * 100
              )}
              %
            </span>
          </div>
          <div className="flex gap-2 mb-8">
            {validQuestions.map((_, idx) => (
              <div
                key={idx}
                className={`w-7 h-7 rounded flex items-center justify-center font-semibold text-xs border ${
                  current === idx
                    ? "bg-orange-500 text-white border-orange-500"
                    : answers[idx] !== null
                    ? "bg-orange-200 text-orange-700 border-orange-200"
                    : "bg-white text-gray-400 border-gray-200"
                }`}
              >
                {idx + 1}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1 mt-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-orange-500 inline-block"></span>{" "}
              Current
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-orange-200 inline-block"></span>{" "}
              Answered
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-white border border-gray-200 inline-block"></span>{" "}
              Unanswered
            </div>
          </div>
        </div>
        {/* Question Card - fills most of page */}
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-14 shadow-sm w-full min-h-[600px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-bold text-gray-800">
                  Question {current + 1}
                </div>
                <div className="text-base text-gray-500">
                  {answers.filter(a => a !== null).length} /{" "}
                  {validQuestions.length} answered
                </div>
              </div>
              <div className="mb-8 text-xl font-medium text-gray-700">
                {validQuestions[current].question}
              </div>
              <div className="flex flex-col gap-6 mb-8">
                {validQuestions[current].options.map((opt, oIdx) => (
                  <label
                    key={opt.id || oIdx}
                    className={`flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-6 py-5 cursor-pointer transition text-lg ${
                      answers[current] === oIdx ? "border-orange-500" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q${current}`}
                      checked={answers[current] === oIdx}
                      disabled={submitted}
                      onChange={() => handleSelect(oIdx)}
                      className="accent-orange-500 w-6 h-6"
                    />
                    <span className="text-lg text-gray-700">
                      {typeof opt === "object" ? opt.text : opt}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handlePrev}
                disabled={current === 0 || submitted}
                className="px-8 py-3 rounded-2xl bg-gray-100 text-gray-500 font-semibold shadow disabled:opacity-50 text-lg"
              >
                Previous
              </button>
              {current < validQuestions.length - 1 && !submitted ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={answers[current] === null}
                  className="px-8 py-3 rounded-2xl bg-orange-200 text-orange-700 font-semibold shadow disabled:opacity-50 text-lg"
                >
                  Next
                </button>
              ) : !submitted ? (
                <button
                  type="submit"
                  disabled={answers[current] === null}
                  className="px-8 py-3 rounded-2xl bg-orange-500 text-white font-semibold shadow disabled:opacity-50 text-lg"
                >
                  Submit
                </button>
              ) : null}
            </div>
            {submitted && (
              <div className="mt-8 text-2xl font-bold text-green-600 text-center">
                Your score: {score} / {validQuestions.length}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentPreview;