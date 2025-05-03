"use client"

import { useDarkMode } from '@/contexts/ThemeContext'
import React from 'react'

const page = () => {
  const {darkMode, setDarkMode} = useDarkMode()
  return (
    <div className=' bg-blue-200 text-black dark:bg-gray-900 dark:text-white h-screen transition-colors'>
      HELLO WORLD
      <button onClick={() => setDarkMode(!darkMode)}>theme</button>
    </div>
  )
}

export default page