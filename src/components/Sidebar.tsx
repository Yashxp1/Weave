import React from 'react';
import DarkModeToggle from './DarkModeToggle';
import SidebarButton from './SidebarButton';
import { Home } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="h-fit w-fit flex flex-col border px-10 py-2 gap-2 items-start ">
      <div>
        <SidebarButton icon={<Home/>} />
      </div>
      <div>
        <DarkModeToggle />
      </div>
    </aside>
  );
};

export default Sidebar;
