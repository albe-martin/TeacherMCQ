import React from 'react';
import QuizGenerator from './QuizGenerator';
import QuizEditor from './QuizEditor';
import './App.css';

function App() {
  return (
    <div className="p-4 space-y-6">
      <QuizGenerator />
      <QuizEditor />
    </div>
  );
}

export default App
