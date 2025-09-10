import React from "react";
import { Card, CardHeader, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

// QuizGenerator: Lets teachers input topic and number of questions, and generate quiz
function QuizGenerator({ onGenerate }) {
  const [topic, setTopic] = React.useState("");
  const [numQuestions, setNumQuestions] = React.useState(5);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  // Hardcoded OpenAI API key (replace with your own for production)
  const OPENAI_API_KEY = "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";
  const [apiKey, setApiKey] = React.useState("");

  // Fetch questions from OpenAI
  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    const prompt = `Generate ${numQuestions} multiple-choice questions for the topic \"${topic}\". Each question should have multiple answer options and clearly indicate the correct answer as the index of the correct option. Provide the output as JSON in the following format: [ { \"question\": \"Question text here\", \"options\": [\"Option 1\", \"Option 2\", ...], \"answer_idx\": 1 }, ... ]`;
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1000,
          temperature: 0.7,
          // dangerouslyAllowBrowser: true // If needed for browser
        }),
      });
      const data = await response.json();
      // Extract the JSON from the response
      const content = data.choices?.[0]?.message?.content;
      let questions;
      try {
        questions = JSON.parse(content);
      } catch (e) {
        setError("Failed to parse questions. Try again or check API response.");
        setLoading(false);
        return;
      }
      onGenerate(questions);
    } catch (err) {
      setError("Error fetching questions from OpenAI.");
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>Quiz Generator</CardHeader>
      <CardContent>
  <div className="space-y-4">
          {/* Remove API key input, since it's hardcoded */}
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
          <Button onClick={handleGenerate} disabled={loading || !topic || !numQuestions}>
            {loading ? "Generating..." : "Generate Quiz"}
          </Button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      </CardContent>
    </Card>
  );
}

export default QuizGenerator;
