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
            className="px-5 py-2 rounded-full font-semibold shadow transition-all duration-200 focus:outline-none bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:scale-105 hover:from-orange-500 hover:to-orange-600 active:scale-95"
            onClick={() => navigate('/')}
          >
            Generate
          </button>
        )}
        {showToggle && (
          <div className="relative flex items-center bg-white rounded-full shadow-md px-2 py-1 w-64 h-14 border border-orange-300">
            {/* Animated pill toggle - clean, single border */}
            <div
              className={`absolute top-1 left-1 h-12 w-32 rounded-full transition-all duration-300 ease-in-out bg-gradient-to-r from-orange-400 to-orange-500 shadow ${mode === 'student' ? 'translate-x-32' : ''}`}
              style={{ willChange: 'transform', border: '2px solid #fb923c' }}
            />
            <button
              className={`relative z-10 w-1/2 h-12 rounded-full font-sans font-bold text-lg transition-all duration-200 focus:outline-none flex items-center justify-center ${mode === 'teacher' ? 'text-orange-700' : 'text-orange-400'} active:scale-95`}
              onClick={() => setMode('teacher')}
              style={{ background: 'transparent', border: 'none' }}
            >
              Teacher
            </button>
            <button
              className={`relative z-10 w-1/2 h-12 rounded-full font-sans font-bold text-lg transition-all duration-200 focus:outline-none flex items-center justify-center ${mode === 'student' ? 'text-blue-700' : 'text-blue-400'} active:scale-95`}
              onClick={() => setMode('student')}
              style={{ background: 'transparent', border: 'none' }}
            >
              Student
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
