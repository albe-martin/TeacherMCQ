import React from "react";

// ModeToggle: Switch between teacher and student views
function ModeToggle({ mode, setMode }) {
  return (
    <div className="flex items-center gap-4 bg-white p-2 rounded-full shadow border border-gray-200">
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold border transition-colors focus:outline-none
          ${mode === 'teacher' ? 'bg-blue-600 text-white border-blue-600 shadow' : 'bg-white text-blue-600 border-gray-300 hover:bg-blue-100'}
        `}
        onClick={() => setMode('teacher')}
      >
        Teacher
      </button>
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold border transition-colors focus:outline-none
          ${mode === 'student' ? 'bg-green-600 text-white border-green-600 shadow' : 'bg-white text-green-600 border-gray-300 hover:bg-green-100'}
        `}
        onClick={() => setMode('student')}
      >
        Student
      </button>
    </div>
  );
}

export default ModeToggle;
