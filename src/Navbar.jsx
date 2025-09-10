import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import reactLogo from './assets/react.svg';

export default function Navbar({ mode, setMode }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show view buttons if questions exist and not on landing page
  const showGenerate = location.pathname !== '/';
  const showToggle = location.pathname === '/teacher' && window.questions && window.questions.length > 0;
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-orange-50 border-b border-orange-200 shadow-sm fixed top-0 left-0 z-30">
      <div className="flex items-center gap-3">
        <img src={reactLogo} alt="Logo" className="h-8 w-8" />
        <span className="font-bold text-xl text-orange-600 tracking-tight">TeacherMCQ</span>
      </div>
      <div className="flex items-center gap-4">
        {showGenerate && (
          <button
            className="px-4 py-2 rounded font-semibold transition-colors focus:outline-none bg-white border border-orange-500 text-orange-600 hover:bg-orange-100"
            onClick={() => navigate('/')}
          >
            Generate
          </button>
        )}
        {showToggle && (
          <div className="flex items-center gap-0 bg-white border border-orange-200 rounded-full shadow px-1 py-1">
            <button
              className={`px-4 py-2 rounded-full font-semibold transition-colors focus:outline-none ${mode === 'teacher' ? 'bg-orange-500 text-white' : 'bg-white text-orange-500'} hover:bg-orange-100`}
              onClick={() => setMode('teacher')}
            >
              Teacher
            </button>
            <button
              className={`px-4 py-2 rounded-full font-semibold transition-colors focus:outline-none ${mode === 'student' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} hover:bg-blue-100`}
              onClick={() => setMode('student')}
            >
              Student
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
