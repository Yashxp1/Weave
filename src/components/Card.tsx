import { Heart, MessageSquare, Send } from 'lucide-react';
import React from 'react';

const Card = () => {
  return (
    <div className=" bg-[#181818] w-[90%] lg:w-[60%] rounded-4xl border border-[#2D2D2D]">
      <div className="flex w-full gap-3 p-8">
        <div className="flex">
          <img
            src=""
            alt="pfp"
            className="rounded-full h-10 w-10 border border-[#2D2D2D]"
          />
        </div>
        <div className="">
          <div className="space-x-2">
            <span>yashxp1</span> <span className="text-gray-700">6h</span>
          </div>
          <div>
            <p className="text-wrap">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              ipsa veniam architecto amet autem illum reprehenderit rem
              molestiae quis ea!
            </p>
          </div>

          <div className="flex gap-4 pt-6 text-gray-400">
            <span className="flex transition-all gap-2 items-center hover:bg-[#1E1E1E] p-2 pl-0 rounded-4xl">
              <Heart size={20} />
              <span className="text-sm">12.3K</span>
            </span>

            <span className="flex hover:bg-[#1E1E1E] p-2 rounded-4xl gap-2 items-center">
              <MessageSquare size={20} />
              <span className="text-sm">1.8K</span>
            </span>
            <span className="flex hover:bg-[#1E1E1E] p-2  rounded-4xl gap-2 items-center">
              <Send size={20} />
            </span>
          </div>
        </div>
      </div>
      <div className="border border-[#2D2D2D]"></div>
      <div className="flex w-full gap-3 p-8">
        <div className="flex">
          <img
            src=""
            alt="pfp"
            className="rounded-full h-10 w-10 border border-[#2D2D2D]"
          />
        </div>
        <div className="">
          <div className="space-x-2">
            <span>yashxp1</span> <span className="text-gray-700">6h</span>
          </div>
          <div>
            <p className="text-wrap">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              ipsa veniam architecto amet autem illum reprehenderit rem
              molestiae quis ea!
            </p>
          </div>

          <div className="flex gap-4 pt-6 text-gray-400">
            <span className="flex transition-all gap-2 items-center hover:bg-[#1E1E1E] p-2 pl-0 rounded-4xl">
              <Heart size={20} />
              <span className="text-sm">12.3K</span>
            </span>

            <span className="flex hover:bg-[#1E1E1E] p-2 rounded-4xl gap-2 items-center">
              <MessageSquare size={20} />
              <span className="text-sm">1.8K</span>
            </span>
            <span className="flex hover:bg-[#1E1E1E] p-2  rounded-4xl gap-2 items-center">
              <Send size={20} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
