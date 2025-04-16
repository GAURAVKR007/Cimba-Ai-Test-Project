import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <nav className="container mx-auto px-4 py-4 flex gap-6">
            <NavLink to="/" className={({ isActive }) => isActive ? "font-semibold text-blue-600" : "text-gray-700"}>
              Summarizer
            </NavLink>
            <NavLink to="/history" className={({ isActive }) => isActive ? "font-semibold text-blue-600" : "text-gray-700"}>
              History
            </NavLink>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
