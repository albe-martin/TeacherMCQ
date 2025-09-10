import React from "react";
import { Card, CardHeader, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";

// QuizEditor: Lets teachers edit questions and answers
function QuizEditor({ questions, setQuestions }) {
  // Local state for editing questions
  const [editQuestions, setEditQuestions] = React.useState([]);

  // Assign IDs to questions and options when loaded
  React.useEffect(() => {
    if (questions.length > 0 && !questions.every(q => q.id && q.options.every(opt => typeof opt === 'object' && opt.id))) {
      const updated = questions.map(q => ({
        ...q,
        id: q.id || crypto.randomUUID(),
        options: q.options.map(opt =>
          typeof opt === 'object' ? { ...opt, id: opt.id || crypto.randomUUID() } : { text: opt, id: crypto.randomUUID() }
        )
      }));
      setQuestions(updated);
      setEditQuestions(updated);
    } else {
      setEditQuestions(questions);
    }
    // eslint-disable-next-line
  }, [questions]);

  // Update question text in local state
  const handleQuestionChange = (id, value) => {
    setEditQuestions(editQuestions.map(q =>
      q.id === id ? { ...q, question: value } : q
    ));
  };

  // Update option text in local state
  const handleOptionChange = (qId, oId, value) => {
    setEditQuestions(editQuestions.map(q =>
      q.id === qId
        ? {
            ...q,
            options: q.options.map(opt =>
              opt.id === oId ? { ...opt, text: value } : opt
            ),
          }
        : q
    ));
  };

  // Change which option is correct
  const handleAnswerChange = (qId, oId) => {
    setEditQuestions(editQuestions.map(q =>
      q.id === qId ? { ...q, answer_idx: q.options.findIndex(opt => opt.id === oId) } : q
    ));
  };

  // Save changes to main questions state
  const handleSave = () => {
    setQuestions(editQuestions);
  };

  // Main UI for editing questions
  return (
    <div className="w-full min-h-screen pt-8 pb-8 px-0 flex flex-col items-center bg-transparent">
      {/* Heading and subtitle */}
      <div className="w-full max-w-5xl px-8 mt-2">
        <h1 className="text-3xl font-bold text-gray-900 mb-1 font-sans">Edit Quiz Questions</h1>
        <div className="text-lg text-gray-500 font-normal mb-8">Edit your questions and answers below</div>
      </div>
      {/* List of questions to edit */}
      <div className="w-full max-w-5xl px-8 flex flex-col gap-8">
        {editQuestions.length === 0 ? (
          <p className="text-gray-500 text-lg">No questions yet. Generate a quiz first.</p>
        ) : (
          editQuestions.map((q, idx) => (
            <div key={q.id} className="rounded-2xl border border-orange-200 bg-orange-50 p-10 shadow-sm w-full">
              {/* Question number and text input */}
              <div className="text-lg font-semibold text-gray-700 mb-4">Question {idx + 1}</div>
              <Input
                type="text"
                value={q.question}
                onChange={e => handleQuestionChange(q.id, e.target.value)}
                className="mb-6 bg-white border border-orange-100 text-base px-4 py-3 rounded-2xl font-sans w-full transition-all"
              />
              {/* List of answer options */}
              <div className="mb-4 text-base font-medium text-gray-600">Answer Options</div>
              <div className="space-y-3 mb-4">
                {q.options.map((opt, oIdx) => (
                  <div key={opt.id} className="flex items-center gap-3">
                    {/* Radio button for correct answer */}
                    <input
                      type="radio"
                      checked={q.answer_idx === oIdx}
                      onChange={() => handleAnswerChange(q.id, opt.id)}
                      className="accent-orange-500 w-5 h-5"
                    />
                    {/* Option text input */}
                    <Input
                      type="text"
                      value={opt.text}
                      onChange={e => handleOptionChange(q.id, opt.id, e.target.value)}
                      className="bg-white border border-orange-100 text-base px-4 py-2 rounded-2xl font-sans w-full transition-all"
                    />
                  </div>
                ))}
              </div>
              {/* Show which answer is correct */}
              <div className="mt-6 text-base font-semibold text-gray-700">
                Correct Answer: <span className="font-normal">{q.options[q.answer_idx]?.text || ''}</span>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Save Changes button at bottom */}
      <div className="w-full max-w-5xl px-8 flex justify-center mt-10">
        <button
          onClick={handleSave}
          className="px-8 py-4 rounded font-semibold bg-orange-500 hover:bg-orange-600 text-white shadow transition text-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
export default QuizEditor;
