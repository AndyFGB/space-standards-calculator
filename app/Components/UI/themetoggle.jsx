"use client"

import React, { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode preference on initial load
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('darkMode') === 'true';
      setDarkMode(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme);
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium"
      aria-label="Toggle dark mode"
    >
      {darkMode ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
};