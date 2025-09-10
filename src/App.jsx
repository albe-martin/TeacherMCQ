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
      {/* Header with back and toggle buttons aligned */}
      <div className="fixed top-4 left-0 w-full z-20 flex items-center justify-between px-8">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold border transition-colors focus:outline-none bg-white shadow border-gray-200 hover:bg-blue-100"
          onClick={() => navigate('/')}
          aria-label="Back to Home"
          style={{ height: '48px' }}
        >
          <FiArrowLeft size={20} className="text-blue-600" />
        </button>
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
