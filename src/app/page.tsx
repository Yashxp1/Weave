import DarkModeToggle from '@/components/DarkModeToggle';
import React from 'react';

const page = () => {
 
  return (
    <div className=" bg-blue-200 text-black dark:bg-gray-900 dark:text-white h-screen transition-colors">
      <DarkModeToggle />
    </div>
  );
};

export default page;
