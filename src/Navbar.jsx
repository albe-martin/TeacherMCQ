import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import reactLogo from './assets/react.svg';

export default function Navbar({ mode, setMode }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 shadow-sm fixed top-0 left-0 z-30">
      <div className="flex items-center gap-3">
        {/* Logo placeholder, will change later */}
        <img src={reactLogo} alt="Logo" className="h-8 w-8" />
        <span className="font-bold text-xl text-orange-600 tracking-tight">TeacherMCQ</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          className={`px-4 py-2 rounded font-semibold transition-colors focus:outline-none bg-white border border-green-500 text-green-600 hover:bg-green-100`}
          onClick={() => navigate('/')}
        >
          Generate
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition-colors focus:outline-none ${mode === 'teacher' ? 'bg-orange-500 text-white' : 'bg-white border border-orange-500 text-orange-500'} hover:bg-orange-100`}
          onClick={() => setMode('teacher')}
        >
          Teacher
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition-colors focus:outline-none ${mode === 'student' ? 'bg-blue-500 text-white' : 'bg-white border border-blue-500 text-blue-500'} hover:bg-blue-100`}
          onClick={() => setMode('student')}
        >
          Student
        </button>
      </div>
    </nav>
  );
}
