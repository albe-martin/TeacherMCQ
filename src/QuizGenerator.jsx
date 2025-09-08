import React from "react";
import { Card, CardHeader, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

// QuizGenerator: Lets teachers input topic and number of questions, and generate quiz
function QuizGenerator({ setQuestions }) {
  const [topic, setTopic] = React.useState("");
  const [numQuestions, setNumQuestions] = React.useState(5);

  // Placeholder for generating questions
  const handleGenerate = () => {
    // Later: Call OpenAI API here
    // For now, just set dummy questions
    const dummyQuestions = Array.from({ length: numQuestions }, (_, i) => ({
      question: `Sample question ${i + 1} about ${topic}`,
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      answer_idx: 0
    }));
    setQuestions(dummyQuestions);
  };

  return (
    <Card>
      <CardHeader>Quiz Generator</CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Topic:</label>
            <Input
              type="text"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="Enter quiz topic"
            />
          </div>
          <div>
            <label className="block mb-1">Number of Questions:</label>
            <Input
              type="number"
              min={1}
              max={20}
              value={numQuestions}
              onChange={e => setNumQuestions(Number(e.target.value))}
            />
          </div>
          <Button onClick={handleGenerate}>Generate Quiz</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default QuizGenerator;
