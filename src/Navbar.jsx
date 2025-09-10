import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import SpiralLogo from './components/SpiralLogo';

export default function Navbar({ mode, setMode }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show view buttons if questions exist and not on landing page
  const showGenerate = location.pathname !== '/';
  const showToggle = location.pathname === '/teacher' && window.questions && window.questions.length > 0;
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-orange-50 border-b border-orange-200 shadow-sm fixed top-0 left-0 z-30">
      <div className="flex items-center w-full">
        {/* Back button at far left, only on non-landing pages */}
        {location.pathname !== '/' && (
          <button
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-white border border-orange-200 ml-0 mr-5 hover:bg-orange-50 active:scale-95"
            onClick={() => navigate('/')}
            aria-label="Go Back"
            style={{ minWidth: '60px', minHeight: '60px' }}
          >
            <FiArrowLeft size={24} color="#222" />
          </button>
        )}
        {/* Cute spiral logo and text */}
        <div className="flex items-center">
          <div className="mr-3"><span><SpiralLogo size={40} /></span></div>
          <div className="flex flex-col items-start">
            <span className="font-bold text-2xl text-gray-900 tracking-tight">Teacher MCQ Quiz</span>
            <span className="text-sm text-orange-500 mt-1">AI generated quiz</span>
          </div>
        </div>
        {/* Spacer to push toggle to right */}
        <div className="flex-1" />
        {showToggle && (
          <div className="relative flex items-center bg-white rounded-2xl shadow-md w-56 h-10 border border-orange-200 overflow-hidden">
            {/* Animated sliding background */}
            <div
              className={`absolute top-1 left-1 h-8 w-1/2 rounded-2xl bg-gradient-to-r from-orange-400 to-orange-500 transition-transform duration-300 ease-in-out`}
              style={{ transform: mode === 'student' ? 'translateX(100%)' : 'translateX(0)' }}
            />
            <button
              className={`relative z-10 w-1/2 h-8 rounded-2xl font-sans font-bold text-base transition-all duration-200 focus:outline-none flex items-center justify-center active:scale-95 ${mode === 'teacher' ? 'text-white' : 'text-black'}`}
              onClick={() => setMode('teacher')}
              style={{ background: 'transparent', border: 'none' }}
            >
              Teacher
            </button>
            <button
              className={`relative z-10 w-1/2 h-8 rounded-2xl font-sans font-bold text-base transition-all duration-200 focus:outline-none flex items-center justify-center active:scale-95 ${mode === 'student' ? 'text-white' : 'text-black'}`}
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
