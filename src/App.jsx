import React from 'react';
import QuizGenerator from './QuizGenerator';
import QuizEditor from './QuizEditor';
import StudentPreview from './StudentPreview';
import ModeToggle from './ModeToggle';
import './App.css';

function App() {
  // State for mode: 'teacher' or 'student'
  const [mode, setMode] = React.useState('teacher');
  // State for quiz questions
  const [questions, setQuestions] = React.useState([]);

  return (
    <div className="p-4 space-y-6">
      <ModeToggle mode={mode} setMode={setMode} />
      {mode === 'teacher' && (
        <>
          <QuizGenerator setQuestions={setQuestions} />
          <QuizEditor questions={questions} setQuestions={setQuestions} />
        </>
      )}
      {mode === 'student' && (
        <StudentPreview questions={questions} />
      )}
    </div>
  );
}

export default App
