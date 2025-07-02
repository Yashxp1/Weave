import Feed from '@/components/Feed';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import SidebarII from '@/components/SidebarII';
import React from 'react';

const Page = () => {
  return (
    <div className="flex justify-center bg-background text-foreground">
     
      <div className="hidden md:flex w-[250px] border-r">
        <Sidebar />
      </div>

      {/* CENTER FEED */}
      <div className="flex flex-col min-h-screen w-full max-w-2xl border-x relative">
        <Navbar />
        <Feed />
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="hidden lg:flex w-[300px] border-l">
        <SidebarII />
      </div>
    </div>
  );
};

export default Page;
