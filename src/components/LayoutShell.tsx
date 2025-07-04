'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SidebarII from './SidebarII';

const LayoutShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const hideLayout =
    pathname === '/' || pathname === '/login' || pathname === '/register';

  if (hideLayout) return <>{children}</>;

  return (
    <div className="flex justify-center bg-background text-foreground">
      <div className="hidden md:flex w-[250px] border-r">
        <Sidebar />
      </div>

      <div className="flex flex-col min-h-screen w-full max-w-2xl border-x relative">
        <Navbar />
        {children}
      </div>

      <div className="hidden lg:flex w-[300px] border-l">
        <SidebarII />
      </div>
    </div>
  );
};

export default LayoutShell;
