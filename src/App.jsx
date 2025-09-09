import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
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
    <div className="p-4 max-w-xl mx-auto">
      <QuizGenerator onGenerate={handleGenerateQuiz} />
    </div>
  );

  // Teacher page: toggle, editor, preview, back button
  const TeacherPage = () => (
    <div className="p-4 max-w-3xl mx-auto space-y-6 relative min-h-screen">
      {/* Back button top left */}
      <button
        className="fixed top-4 left-4 z-20 flex items-center gap-2 px-3 py-2 rounded-full bg-white shadow hover:bg-gray-100 transition-colors border border-gray-200"
        onClick={() => navigate('/')}
        aria-label="Back to Home"
      >
        <FiArrowLeft size={20} />
      </button>
      {/* ModeToggle top right */}
      <div className="fixed top-4 right-4 z-20">
        <ModeToggle mode={mode} setMode={setMode} />
      </div>
      <div className="pt-24">
        {mode === 'teacher' && (
          <>
            <QuizEditor questions={questions} setQuestions={setQuestions} />
          </>
        )}
        {mode === 'student' && (
          <StudentPreview questions={questions} />
        )}
      </div>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/teacher" element={<TeacherPage />} />
    </Routes>
  );
}

export default App
