"use client"
import Hero from '@/components/Landing/Hero';
import Navbar from '@/components/Landing/Navbar';
import { useTheme } from 'next-themes';
// import { ModeToggle } from '@/components/ModeToggle';
import React, { useEffect } from 'react';

const page = () => {
   const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('light'); // Force light mode on mount
  }, []);
  return (
    <div className="">
      <Navbar />
      <Hero />
    </div>
  );
};

export default page;
