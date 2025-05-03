"use client"

import { useDarkMode } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import React from 'react';

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  return (
    <div className=''>
      <button className='transition-all bg-blue-300  rounded-full p-1.5 text-blue-950 ' onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <Moon/> : <Sun/>}
      </button>
    </div>
  );
};

export default DarkModeToggle;
