"use client"

import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';
import React from 'react';
import Navbar from './Navbar';

const ClientLayput = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const showSidebar = ['/chat', '/profile', "/home"].includes(pathname);
  const showNavbar = pathname === '/home';

  return (
    <div className="flex h-screen dark:bg-dark bg-light text-dark dark:text-light transition-all">
      {showSidebar && <Sidebar />}
      <div className="flex flex-col flex-grow w-full max-w-[1400px]">
        {showNavbar && <Navbar />}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default ClientLayput;
