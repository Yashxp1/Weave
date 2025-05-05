import DarkModeToggle from '@/components/DarkModeToggle';
import Sidebar from '@/components/Sidebar';
import React from 'react';

const page = () => {
  return (
    <div className="dark:bg-dark bg-light h-screen text-dark dark:text-light transition-all">
      <Sidebar />
    </div>
  );
};

export default page;
