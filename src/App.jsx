import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
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
  const navigate = useNavigate();

  // Handler for generating quiz and navigating to teacher page
  const handleGenerateQuiz = (newQuestions) => {
    setQuestions(newQuestions);
    setMode('teacher');
    navigate('/teacher');
  };

  // Landing page: only QuizGenerator
  const LandingPage = () => (
    <div className="pt-20 px-4 flex justify-center">
      <div className="w-full max-w-2xl">
        <QuizGenerator onGenerate={handleGenerateQuiz} />
      </div>
    </div>
  );

  // Teacher page: toggle, editor, preview
  const TeacherPage = () => (
    <div className="pt-20 px-4 flex justify-center min-h-screen">
      <div className="w-full max-w-3xl">
        {mode === 'teacher' && (
          <QuizEditor questions={questions} setQuestions={setQuestions} />
        )}
        {mode === 'student' && (
          <StudentPreview questions={questions} />
        )}
      </div>
    </div>
  );

  return (
    <>
      <Navbar mode={mode} setMode={setMode} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/teacher" element={<TeacherPage />} />
      </Routes>
    </>
  );
}

export default App
