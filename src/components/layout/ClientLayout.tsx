"use client"

import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';
import React from 'react';
import Navbar from './Navbar';
import Modal from './Modal';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const showSidebar = ['/chat', '/profile', "/home"].includes(pathname);
  const showNavbar = pathname === '/home';

  return (
    <div className="flex h-screen w-full dark:bg-dark bg-light text-dark dark:text-light transition-all">
      {showSidebar && <Sidebar />}
      <div className="flex flex-col flex-grow">
        {showNavbar && <Navbar />}
        <main className="flex-1 overflow-y-auto">{children}</main>
        <Modal />
      </div>
    </div>
  );
};

export default ClientLayout;
