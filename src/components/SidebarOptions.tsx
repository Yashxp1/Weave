import {
  AudioLines,
  Ellipsis,
  LayoutDashboard,
  Mail,
  Plus,
  UserRound,
} from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';
import { ToggelTheme } from './ToggelTheme';
import { useAuthStore } from '@/store/apiStore';
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { Modal } from './Modal';
// import { useRouter } from 'next/router';

const options = [
  { type: 'Home', url: '/', icon: LayoutDashboard },
  { type: 'Profile', url: '/profile', icon: UserRound },
  { type: 'Messages', url: '/messages', icon: Mail },
  { type: 'More', url: '#', icon: Ellipsis },
  // { type: 'Create Post', url: '#', icon: Plus },
];

const SidebarOptions = () => {
  const { logout } = useAuthStore();

  const router = useRouter();

  const handleLogOut = async () => {
    const success = await logout();
    if (success) {
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <Link href="/dashboard" className="mb-6">
        <div className="flex items-center gap-2 text-xl font-bold px-3 py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full w-fit">
          <AudioLines size={24} />
          <span>weave</span>
        </div>
      </Link>

      {options.map(({ type, url, icon: Icon }, idx) => (
        <Link key={idx} href={url}>
          <div className="flex items-center gap-4 px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full w-fit transition-all">
            <Icon size={22} />
            <span className="text-base font-semibold">{type}</span>
          </div>
        </Link>
      ))}

      <div className="mt-auto flex justify-center items-center gap-3 pt-10 px-4">
        <ModeToggle />
        <Modal></Modal>
      </div>
      <div>
      </div>

      {/* <div className="mt-auto pt-10 px-4">
        <ToggelTheme />
      </div> */}
      <div className="mt-auto pt-10 px-4">
        <Button
          onClick={handleLogOut}
          variant="destructive"
          className="font-semibold cursor-pointer"
        >
          Log out
        </Button>
      </div>
      <Toaster />
    </div>
  );
};

export default SidebarOptions;
