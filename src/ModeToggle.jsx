import React from "react";

// ModeToggle: Switch between teacher and student views
function ModeToggle({ mode, setMode }) {
  return (
    <div className="flex items-center gap-4">
      <h2>Mode Toggle</h2>
      <button
        className={`px-3 py-1 rounded ${mode === 'teacher' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setMode('teacher')}
      >
        Teacher
      </button>
      <button
        className={`px-3 py-1 rounded ${mode === 'student' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setMode('student')}
      >
        Student
      </button>
    </div>
  );
}

export default ModeToggle;
