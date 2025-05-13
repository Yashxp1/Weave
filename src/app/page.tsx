import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className="text-xl space-x-4">
      <Link href="/login">
        <button className="border cursor-pointer p-3 border-blue-500 bg-blue-950 rounded-lg">
          LOGIN
        </button>
      </Link>
      <Link href="/register">
        <button className="border  cursor-pointer p-3 border-blue-500 bg-blue-950 rounded-lg">
          Register
        </button>
      </Link>
    </div>
  );
};

export default page;
