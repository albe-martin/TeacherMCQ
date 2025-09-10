// Import React StrictMode for highlighting potential problems
import { StrictMode } from 'react';
// Import createRoot to render the app
import { createRoot } from 'react-dom/client';
// Import BrowserRouter for routing between pages
import { BrowserRouter } from 'react-router-dom';
// Import global styles
import './index.css';
// Import the main App component
import App from './App.jsx';

// Render the app into the root div in index.html
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter enables navigation between pages */}
    <BrowserRouter>
      {/* Main App component */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
