'use client';

import React, { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';
import SidebarButton from './SidebarButton';
import { AudioLines, Home, Mail, Plus, Search, UserRound } from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
  // const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <aside className="h-screen w-fit py-6 sticky top-0 z-10">
      <div className="h-full w-fit flex flex-col justify-between border-gray-800 rounded-lg">
        <div className="flex items-center justify-center">
          <Link href='/'>
            <AudioLines
              size={20}
              className="w-12 h-12 hover:scale-110 transition-all rounded-full"
            />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <SidebarButton href="/home" icon={<Home size={28} />} />
          <SidebarButton href="/search" icon={<Search size={28} />} />
          <SidebarButton icon={<Plus size={28} />} />
          <SidebarButton href="/chat" icon={<Mail size={28} />} />
          <SidebarButton href="/profile" icon={<UserRound size={28} />} />
        </div>

        <div className="flex items-center justify-center py-10">
          <DarkModeToggle />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
