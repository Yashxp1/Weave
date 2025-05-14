import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className="text-xl space-x-4">
      <Link href="/login">
        <button className=" bg-white transition-colors border border-[#D5D5D5] dark:border-[#2D2D2D] text-black py-2 md:w-96 w-72 rounded-lg font-semibold hover:bg-gray-100">
          LOGIN
        </button>
      </Link>
      <Link href="/register">
        <button className=" bg-white transition-colors border border-[#D5D5D5] dark:border-[#2D2D2D] text-black py-2 md:w-96 w-72 rounded-lg font-semibold hover:bg-gray-100">
          Register
        </button>
      </Link>

      <Link href="/home">
        <button className=" bg-white transition-colors border border-[#D5D5D5] dark:border-[#2D2D2D] text-black py-2 md:w-96 w-72 rounded-lg font-semibold hover:bg-gray-100">
          Home
        </button>
      </Link>
    </div>
  );
};

export default page;
