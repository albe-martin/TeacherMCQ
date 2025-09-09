import React from "react";

// ModeToggle: Switch between teacher and student views
function ModeToggle({ mode, setMode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-medium text-gray-600 mr-2">View:</span>
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold border transition-colors focus:outline-none
          ${mode === 'teacher' ? 'bg-blue-500 text-white border-blue-500 shadow' : 'bg-white text-blue-500 border-gray-300 hover:bg-blue-50'}
        `}
        onClick={() => setMode('teacher')}
      >
        Teacher
      </button>
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold border transition-colors focus:outline-none
          ${mode === 'student' ? 'bg-green-500 text-white border-green-500 shadow' : 'bg-white text-green-500 border-gray-300 hover:bg-green-50'}
        `}
        onClick={() => setMode('student')}
      >
        Student
      </button>
    </div>
  );
}

export default ModeToggle;
