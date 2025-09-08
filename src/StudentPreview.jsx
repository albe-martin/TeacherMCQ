import React from "react";

// StudentPreview: Shows quiz as a student would see it
function StudentPreview({ questions }) {
  const [answers, setAnswers] = React.useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    setAnswers(Array(questions.length).fill(null));
    setSubmitted(false);
  }, [questions]);

  const handleSelect = (qIdx, oIdx) => {
    const updated = [...answers];
    updated[qIdx] = oIdx;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = answers.reduce((acc, ans, idx) => {
    if (ans === questions[idx]?.answer_idx) return acc + 1;
    return acc;
  }, 0);

  return (
    <div className="space-y-4">
      <h2>Student Preview</h2>
      {questions.length === 0 ? (
        <p>No questions yet. Generate a quiz first.</p>
      ) : (
        <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
          {questions.map((q, qIdx) => (
            <div key={qIdx} className="border rounded p-4 space-y-2">
              <div className="font-semibold">{q.question}</div>
              <div className="space-y-1">
                {q.options.map((opt, oIdx) => (
                  <label key={oIdx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`q${qIdx}`}
                      checked={answers[qIdx] === oIdx}
                      disabled={submitted}
                      onChange={() => handleSelect(qIdx, oIdx)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
          {!submitted ? (
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">Submit</button>
          ) : (
            <div className="mt-4 text-lg font-bold">Your score: {score} / {questions.length}</div>
          )}
        </form>
      )}
    </div>
  );
}

export default StudentPreview;
