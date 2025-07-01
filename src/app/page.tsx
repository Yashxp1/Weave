import Hero from '@/components/Landing/Hero';
import Navbar from '@/components/Landing/Navbar';
// import { ModeToggle } from '@/components/ModeToggle';
import React from 'react';

const page = () => {
  return (
    <div className="light bg-white text-black">
      <Navbar />
      <Hero />
    </div>
  );
};

export default page;
