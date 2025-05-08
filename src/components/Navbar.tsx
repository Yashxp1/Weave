import React from 'react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 py-8 dark:bg-dark flex bg-light text-dark dark:text-light transition-all w-full h-fit justify-center items-center pt-4 space-x-2  ">
      <button className="dark:hover:bg-iconBg  hover:bg-gray-200 hover:text-black dark:hover:text-white transition-all py-1  px-3 rounded-full">
        For you
      </button>
      <button className="dark:hover:bg-iconBg  hover:bg-gray-200 hover:text-black dark:hover:text-white transition-all py-1  px-3 rounded-full">
        Following
      </button>
    </nav>
  );
};

export default Navbar;
