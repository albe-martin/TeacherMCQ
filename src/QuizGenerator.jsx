import React from "react";
import { Card, CardHeader, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

// QuizGenerator: Lets teachers input topic and number of questions, and generate quiz using AI
function QuizGenerator({ onGenerate }) {
  // State for topic, number of questions, loading, and error
  const [topic, setTopic] = React.useState("");
  const [numQuestions, setNumQuestions] = React.useState(5);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  // OpenAI API key (replace with your own for production)
  const OPENAI_API_KEY = "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";
  const [apiKey, setApiKey] = React.useState("");

  // Function to generate questions from OpenAI
  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    const prompt = `Generate ${numQuestions} multiple-choice questions for the topic \"${topic}\". Each question should have multiple answer options and clearly indicate the correct answer as the index of the correct option. Provide the output as JSON in the following format: [ { \"question\": \"Question text here\", \"options\": [\"Option 1\", \"Option 2\", ...], \"answer_idx\": 1 }, ... ]`;
    try {
      // Send request to OpenAI
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
      // Pass generated questions to parent
      onGenerate(questions);
    } catch (err) {
      setError("Error fetching questions from OpenAI.");
    }
    setLoading(false);
  };

  // Main UI for quiz generation
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex flex-col">
      {/* Navbar at the top */}
      <nav className="fixed top-0 left-0 w-full h-16 flex items-center px-4 sm:px-8 md:px-10 bg-white/95 backdrop-blur border-b border-orange-100 shadow-sm z-10">
        <span className="text-xl font-semibold text-orange-700 tracking-tight font-sans">Teacher MCQ Quiz</span>
      </nav>
      {/* Centered card for quiz generation */}
      <div className="flex-1 flex items-center justify-center pt-12 pb-8 px-2 sm:px-4 md:px-0 w-full">
        <Card className="w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl bg-white border border-orange-100 shadow-lg rounded-2xl p-4 sm:p-8 md:p-12 flex flex-col justify-center">
          <CardHeader>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-orange-800 font-sans tracking-tight">Generate Quiz Questions</h1>
            <div className="text-sm sm:text-base text-orange-500 mb-6 sm:mb-8 font-normal font-sans">
              Create multiple-choice questions using AI. Enter your topic and number of questions below.
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 sm:space-y-6">
              {/* Input for quiz topic */}
              <div>
                <label className="block mb-2 font-medium text-orange-700 text-base font-sans">Quiz Topic <span className="text-red-400">*</span></label>
                <Input
                  type="text"
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  placeholder="e.g., World War II, Photosynthesis, JavaScript Basics"
                  className="bg-orange-50 border border-orange-200 text-base font-sans px-3 py-2 focus:ring-2 focus:ring-orange-300 w-full"
                />
              </div>
              {/* Input for number of questions */}
              <div>
                <label className="block mb-2 font-medium text-orange-700 text-base font-sans">Number of Questions</label>
                <Input
                  type="number"
                  min={1}
                  max={20}
                  value={numQuestions}
                  onChange={e => setNumQuestions(Number(e.target.value))}
                  className="bg-orange-50 border border-orange-200 text-base font-sans px-3 py-2 focus:ring-2 focus:ring-orange-300 w-full"
                />
              </div>
              {/* Button to generate quiz */}
              <Button onClick={handleGenerate} disabled={loading || !topic || !numQuestions} className="w-full bg-orange-500 hover:bg-orange-600 text-base font-semibold font-sans py-3 rounded-xl shadow-sm transition">
                {loading ? "Generating..." : "Generate Quiz Questions"}
              </Button>
              {/* Show error if any */}
              {error && <div className="text-red-500 mt-2 text-base font-medium">{error}</div>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default QuizGenerator;
