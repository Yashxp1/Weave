import { Heart, MessageSquare, Send } from 'lucide-react';
import React from 'react';

const Card = () => {
  return (
    <div className="w-full flex justify-center pt-10">
      <div className="bg-white dark:bg-[#181818] border border-[#D5D5D5] dark:border-[#2D2D2D] rounded-4xl w-full max-w-[90%] lg:max-w-[60%] transition-all overflow-y-auto">
        <div className="flex w-full gap-3 p-8">
          <div className="flex">
            <img
              src="p"
              alt="pfp"
              className="rounded-full h-10 w-10 border border-[#D5D5D5] dark:border-[#2D2D2D]"
            />
          </div>
          <div>
            <div className="space-x-2">
              <span>yashxp1</span>
              <span className="text-[#2D2D2D] dark:text-[#aaa] text-sm">6h</span>
            </div>
            <div>
              <p className="break-words">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
                ipsa veniam architecto amet autem illum reprehenderit rem
                molestiae quis ea!
              </p>
            </div>

            <div className="flex gap-2 pt-6 dark:text-gray-400">
              <span className="flex hover:bg-gray-200 transition-all gap-2 items-center dark:hover:bg-[#1E1E1E] p-2 pl-0 rounded-4xl">
                <Heart size={20} />
                <span className="text-sm">12.3K</span>
              </span>

              <span className="flex hover:bg-gray-200 dark:hover:bg-[#1E1E1E] p-2 rounded-4xl gap-2 items-center">
                <MessageSquare size={20} />
                <span className="text-sm">1.8K</span>
              </span>
              <span className="flex hover:bg-gray-200 dark:hover:bg-[#1E1E1E] p-2 rounded-4xl gap-2 items-center">
                <Send size={20} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
