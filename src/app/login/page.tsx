import React from 'react';

const page = () => {
  return (
    <div className="flex justify-center items-center border">
      <div>
        <p className="text-3xl font-semibold">Login in with your email </p>
      </div>
      <div>
        <input type="text" />
        <input type="text" />
      </div>
    </div>
  );
};

export default page;
