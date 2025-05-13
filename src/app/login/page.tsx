import React from 'react';

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex gap-4 flex-col justify-center items-center">
        <div>
          <p className="py-4 text-xl font-semibold">
            Login in with your email{' '}
          </p>
        </div>
        <div className="flex flex-col md:w-96 w-72 gap-4">
          <input
            placeholder="Email"
            type="text"
            className="dark:bg-[#1E1E1E] font-semibold outline-0 bg-gray-200 px-2 py-3 rounded-lg"
          />

          <input
            placeholder="Password"
            type="password"
            className="dark:bg-[#1E1E1E] font-semibold bg-gray-200 px-2 py-3 rounded-lg outline-0"
          />
        </div>
        <div className='flex flex-col gap-3'>
          <button className=" bg-white transition-colors border border-[#D5D5D5] dark:border-[#2D2D2D] text-black py-2 md:w-96 w-72 rounded-lg font-semibold hover:bg-gray-100">
            Login
          </button>
          <button className=" bg-white transition-colors border border-[#D5D5D5] dark:border-[#2D2D2D] text-black py-2 md:w-96 w-72 rounded-lg font-semibold hover:bg-gray-100">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
