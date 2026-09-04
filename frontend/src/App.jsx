import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Stats from './pages/Stats';

// Simplified App component focused on Member 4's feature for testing
const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm py-4 px-8 mb-8 flex justify-between items-center border-b">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-teal-700">LK</span>
            <h1 className="text-xl font-bold text-teal-700">LankaFix</h1>
          </div>
          <div className="flex gap-6 text-sm font-medium text-gray-600">
            <a href="/" className="hover:text-teal-700 transition-colors">Home</a>
            <a href="/report" className="hover:text-teal-700 transition-colors">Report</a>
            <a href="/track" className="hover:text-teal-700 transition-colors">Track</a>
            <a href="/browse" className="hover:text-teal-700 transition-colors">Browse</a>
            <a href="/stats" className="hover:text-teal-700 transition-colors">Stats</a>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Navigate to="/stats" replace />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
