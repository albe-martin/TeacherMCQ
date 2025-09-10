import React from "react";
import SpiralLogo from "./components/SpiralLogo";

// ...existing code...

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
              <div className="w-full min-h-screen flex flex-col items-center pt-8 pb-12 px-2 sm:px-6 md:px-12 bg-transparent">
                <div className="w-full flex flex-col md:flex-row gap-8 max-w-7xl">
                  {/* Progress Card */}
                  <div className="bg-orange-50 border border-orange-100 rounded-3xl p-6 sm:p-8 w-full md:w-72 h-auto md:h-96 flex flex-col items-center shadow-md mt-2 mb-4 md:mb-0">
                    <div className="mb-4">
                      <SpiralLogo size={44} />
                    </div>
                    <div className="text-xl font-extrabold text-gray-900 mb-4 tracking-tight">Progress</div>
                    <div className="mb-6 text-lg font-semibold text-gray-700 text-center">
                      <span className="text-orange-500 font-bold">Question {current + 1}</span> <span className="mx-1">/</span> {validQuestions.length}
                      <span className="ml-2 text-base text-gray-500">{Math.round(((current + 1) / validQuestions.length) * 100)}%</span>
                    </div>
                    {validQuestions.length <= 7 ? (
                      <div className="flex gap-3 mb-10">
                        {validQuestions.map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm border transition-all duration-200 ${
                              current === idx
                                ? "bg-orange-500 text-white border-orange-500 shadow-lg"
                                : answers[idx] !== null
                                ? "bg-orange-200 text-orange-700 border-orange-200"
                                : "bg-white text-gray-400 border-gray-200"
                            }`}
                          >
                            {idx + 1}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="w-full mb-10 flex flex-col items-center">
                        <div className="w-60 h-5 bg-orange-100 rounded-full relative overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-5 bg-orange-500 rounded-full transition-all"
                            style={{ width: `${((current + 1) / validQuestions.length) * 100}%` }}
                          />
                          <div
                            className="absolute top-0 left-0 h-5 w-5 bg-orange-500 rounded-full border-2 border-white shadow"
                            style={{ left: `calc(${((current) / validQuestions.length) * 100}% - 10px)` }}
                          />
                        </div>
                        <div className="mt-3 text-base text-gray-700 font-semibold">
                          Question {current + 1} of {validQuestions.length}
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col gap-2 mt-2 text-sm w-full">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-xl bg-orange-500 inline-block"></span> <span className="font-medium text-gray-700">Current</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-xl bg-orange-200 inline-block"></span> <span className="font-medium text-gray-700">Answered</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-xl bg-white border border-gray-200 inline-block"></span> <span className="font-medium text-gray-700">Unanswered</span>
                      </div>
                    </div>
                  </div>
                  {/* Question Card */}
                  <form onSubmit={handleSubmit} className="flex-1 min-w-0">
                    <div className="bg-orange-50 border border-orange-100 rounded-3xl p-6 sm:p-10 md:p-16 shadow-md w-full min-h-[420px] flex flex-col justify-between">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                          <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                            Question {current + 1}
                          </div>
                          <div className="text-lg text-gray-500 font-semibold">
                            {answers.filter(a => a !== null).length} / {validQuestions.length} answered
                          </div>
                        </div>
                        <div className="mb-8 text-xl sm:text-2xl font-semibold text-gray-800 break-words leading-relaxed">
                          {validQuestions[current].question}
                        </div>
                        <div className="flex flex-col gap-5 sm:gap-7 mb-8">
                          {validQuestions[current].options.map((opt, oIdx) => (
                            <label
                              key={opt.id || oIdx}
                              className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 bg-white border border-gray-200 rounded-2xl px-5 sm:px-8 py-5 sm:py-6 cursor-pointer transition text-lg sm:text-xl w-full min-w-0 font-medium ${
                                answers[current] === oIdx ? "border-orange-500 shadow-md" : ""
                              }`}
                            >
                              <input
                                type="radio"
                                name={`q${current}`}
                                checked={answers[current] === oIdx}
                                disabled={submitted}
                                onChange={() => handleSelect(oIdx)}
                                className="accent-orange-500 w-6 h-6 sm:w-7 sm:h-7 mb-2 sm:mb-0"
                              />
                              <span className="text-lg sm:text-xl text-gray-800 break-words">
                                {typeof opt === "object" ? opt.text : opt}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 mt-8 w-full">
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
                      {submitted && (
                        <div className="mt-8 text-2xl sm:text-3xl font-extrabold text-green-600 text-center">
                          Your score: {score} / {validQuestions.length}
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            )
          }
export default StudentPreview;