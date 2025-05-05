'use client';

import React, { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';
import SidebarButton from './SidebarButton';
import {
  AudioLines,
  Home,
  Plus,
  Search,
  Telescope,
  UserRound,
} from 'lucide-react';

const Sidebar = () => {
  // const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <aside className=" h-screen w-fit py-6">
      <div className="h-full w-fit flex flex-col justify-between border-gray-800 rounded-lg">
        <div className="flex items-center justify-center">
          <AudioLines size={40} className="w-12 h-12 hover:scale-110 transition-all rounded-full" />
        </div>
        <div className="flex flex-col items-center">
          <SidebarButton icon={<Home size={32} />} />
          <SidebarButton icon={<Plus size={32} />} />
          <SidebarButton icon={<Search size={32} />} />
          <SidebarButton icon={<Telescope size={32} />} />
          <SidebarButton icon={<UserRound size={32} />} />
        </div>

        <div className="flex items-center justify-center py-10">
          <DarkModeToggle />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
