import DarkModeToggle from '@/components/DarkModeToggle';
import React from 'react';

const page = () => {
 
  return (
    <div className=" bg-blue-200 text-black dark:bg-[#0A0A0A] dark:text-white h-screen transition-colors">
      <DarkModeToggle />
    </div>
  );
};

export default page;
