import React from 'react';

const Card = () => {
  return (
    <div className="bg-[#181818] w-full max-w-xl rounded-3xl p-6 flex flex-col gap-4 text-white h-screen">


      <div className='bg-blue-950'>

        <div>
          <img
            src="/testimg1.jpg"
            alt="Profile"
            className="rounded-full h-12 w-12 object-cover"
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="font-semibold text-white">yashxp1</span>
            <span className="text-xs text-gray-500">• 6h</span>
          </div>

          <p className="text-md leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            ipsa veniam architecto amet autem lorem50 illum
          </p>

          <div className="w-full rounded-lg overflow-hidden max-h-66">
            <img
              src="/testimg1.jpg"
              alt="Post"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="font-semibold text-white">yashxp1</span>
            <span className="text-xs text-gray-500">• 6h</span>
          </div>

          <p className="text-md leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            ipsa veniam architecto amet autem lorem50 illum
          </p>

          <div className="w-full rounded-lg overflow-hidden max-h-66">
            <img
              src="/testimg1.jpg"
              alt="Post"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

      </div>

    </div>
  );
};

export default Card;
