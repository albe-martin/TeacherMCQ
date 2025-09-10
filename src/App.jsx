import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import QuizGenerator from './QuizGenerator';
import QuizEditor from './QuizEditor';
import StudentPreview from './StudentPreview';
import ModeToggle from './ModeToggle';
import './App.css';

// Main App component: handles routing, mode toggle, and quiz state
function App() {
  // State for mode: 'teacher' or 'student'
  const [mode, setMode] = React.useState('teacher');
  // State for quiz questions
  const [questions, setQuestions] = React.useState([]);
  const navigate = useNavigate();

  // When quiz is generated, update questions and go to teacher page
  const handleGenerateQuiz = (newQuestions) => {
    setQuestions(newQuestions);
    setMode('teacher'); // Always start in teacher mode
    navigate('/teacher');
  };

  // Landing page: only shows quiz generator
  const LandingPage = () => (
    <div className="h-screen flex items-center justify-center px-4 pt-52 overflow-hidden">
      <div className="w-full max-w-full">
        <QuizGenerator onGenerate={handleGenerateQuiz} />
      </div>
    </div>
  );

  // Teacher page: shows editor or student preview based on mode
  const TeacherPage = () => (
    <div className="pt-20 px-4 flex justify-center min-h-screen">
      <div className="w-full max-w-full">
        {/* Show editor if in teacher mode */}
        {mode === 'teacher' && (
          <QuizEditor questions={questions} setQuestions={setQuestions} />
        )}
        {/* Show student preview if in student mode */}
        {mode === 'student' && (
          <StudentPreview questions={questions} />
        )}
      </div>
    </div>
  );

  // Expose questions globally for Navbar logic (mode toggle visibility)
  window.questions = questions;
  return (
    <>
      {/* Navbar with mode toggle */}
      <Navbar mode={mode} setMode={setMode} />
      {/* App routes: landing and teacher page */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/teacher" element={<TeacherPage />} />
      </Routes>
    </>
  );
}

export default App
