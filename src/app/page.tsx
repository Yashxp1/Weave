import { ModeToggle } from '@/components/ModeToggle';
import React from 'react';

const page = () => {
  return (
    <div className="flex justify-between p-3">
      <h1>Landing page</h1>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default page;
