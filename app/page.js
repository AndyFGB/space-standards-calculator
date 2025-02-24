"use client"

import React, { useState, useEffect } from 'react'
import SpaceStandardsCalculator from '../components/SpaceStandardsCalculator'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode based on stored preference
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  return (
    <main className="relative min-h-screen">
      <div className="flex justify-end p-4 mb-2">
        <button 
          onClick={toggleDarkMode}
          className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md flex items-center gap-2"
        >
          {darkMode ? 
            <>
              <span className="text-xl">☀️</span> Light Mode
            </> : 
            <>
              <span className="text-xl">🌙</span> Dark Mode
            </>
          }
        </button>
      </div>
      <div className="px-4">
        <SpaceStandardsCalculator />
      </div>
    </main>
  )
}