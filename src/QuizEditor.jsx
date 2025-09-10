import React from "react";
import { Card, CardHeader, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";

// QuizEditor: Lets teachers edit questions and answers
function QuizEditor({ questions, setQuestions }) {
  // Local state for editing
  const [editQuestions, setEditQuestions] = React.useState([]);

  // Assign IDs only once when questions are first loaded
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

  // Handler to update a question in local state
  const handleQuestionChange = (id, value) => {
    setEditQuestions(editQuestions.map(q =>
      q.id === id ? { ...q, question: value } : q
    ));
  };

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

  const handleAnswerChange = (qId, oId) => {
    setEditQuestions(editQuestions.map(q =>
      q.id === qId ? { ...q, answer_idx: q.options.findIndex(opt => opt.id === oId) } : q
    ));
  };

  // Save changes to main questions state
  const handleSave = () => {
    setQuestions(editQuestions);
  };

  return (
    <Card>
      <CardHeader>Quiz Editor</CardHeader>
      <CardContent>
        <div className="space-y-4">
          {editQuestions.length === 0 ? (
            <p>No questions yet. Generate a quiz first.</p>
          ) : (
            editQuestions.map(q => (
              <Card key={q.id} className="bg-gray-50">
                <CardContent>
                  <Input
                    type="text"
                    value={q.question}
                    onChange={e => handleQuestionChange(q.id, e.target.value)}
                    className="mb-2"
                  />
                  <div className="space-y-1">
                    {q.options.map(opt => (
                      <div key={opt.id} className="flex items-center gap-2">
                        <Input
                          type="text"
                          value={opt.text}
                          onChange={e => handleOptionChange(q.id, opt.id, e.target.value)}
                          className="w-2/3"
                        />
                        <input
                          type="radio"
                          checked={q.answer_idx === q.options.findIndex(o => o.id === opt.id)}
                          onChange={() => handleAnswerChange(q.id, opt.id)}
                        />
                        <span>Correct</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-2 rounded font-semibold shadow hover:bg-blue-700" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default QuizEditor;
