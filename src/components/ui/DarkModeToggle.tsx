'use client';

import { useDarkMode } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import React from 'react';

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  return (
    <div className="">
      <button
        className="transition-colors flex justify-center text-iconTxt rounded-full"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <Moon size={32} /> : <Sun size={32} />}
      </button>
    </div>
  );
};

export default DarkModeToggle;
