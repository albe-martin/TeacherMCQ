import React from "react";
import { Card, CardHeader, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";

// QuizEditor: Lets teachers edit questions and answers
function QuizEditor({ questions, setQuestions }) {
  // Handler to update a question
  const handleQuestionChange = (idx, value) => {
    const updated = [...questions];
    updated[idx].question = value;
    setQuestions(updated);
  };

  // Handler to update an option
  const handleOptionChange = (qIdx, oIdx, value) => {
    const updated = [...questions];
    updated[qIdx].options[oIdx] = value;
    setQuestions(updated);
  };

  // Handler to set correct answer
  const handleAnswerChange = (qIdx, aIdx) => {
    const updated = [...questions];
    updated[qIdx].answer_idx = aIdx;
    setQuestions(updated);
  };

  return (
    <Card>
      <CardHeader>Quiz Editor</CardHeader>
      <CardContent>
        <div className="space-y-4">
          {questions.length === 0 ? (
            <p>No questions yet. Generate a quiz first.</p>
          ) : (
            questions.map((q, qIdx) => (
              <Card key={qIdx} className="bg-gray-50">
                <CardContent>
                  <Input
                    type="text"
                    value={q.question}
                    onChange={e => handleQuestionChange(qIdx, e.target.value)}
                    className="mb-2"
                  />
                  <div className="space-y-1">
                    {q.options.map((opt, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-2">
                        <Input
                          type="text"
                          value={opt}
                          onChange={e => handleOptionChange(qIdx, oIdx, e.target.value)}
                          className="w-2/3"
                        />
                        <input
                          type="radio"
                          checked={q.answer_idx === oIdx}
                          onChange={() => handleAnswerChange(qIdx, oIdx)}
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
      </CardContent>
    </Card>
  );
}

export default QuizEditor;
