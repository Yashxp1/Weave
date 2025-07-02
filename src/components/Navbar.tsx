import { AudioLines, Waves } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';

const Navbar = () => {
  return (
    <nav className="fixed left-0 w-full z-50 flex justify-center">
      <div className="w-full shadow-2xs px-2 text-center bg-white/20 dark:bg-black/20 border-b border-gray-800 py-2  backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center justify-center gap-2">
              <AudioLines />
              <p className="font-semibold text-xl">weave</p>
            </div>
          </Link>
          <div className="gap-2 flex justify-center items-center">
            <ModeToggle />

            <Link href="/login"></Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
