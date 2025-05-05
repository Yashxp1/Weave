import Card from '@/components/Card';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import React from 'react';

const page = () => {
  return (
    <div className="dark:bg-dark flex bg-light text-dark dark:text-light transition-all">
      <Sidebar />

      <div className="flex flex-col flex-grow">
        <Navbar />

        <div className="flex justify-center py-10">
          <Card />
        </div>
      </div>
    </div>
  );
};

export default page;
