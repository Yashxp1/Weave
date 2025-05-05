import DarkModeToggle from '@/components/DarkModeToggle';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import React from 'react';

const page = () => {
  return (
    <div className="dark:bg-dark flex bg-light h-screen text-dark dark:text-light transition-all">
      <Sidebar />
      <Navbar />
    </div>
  );
};

export default page;
