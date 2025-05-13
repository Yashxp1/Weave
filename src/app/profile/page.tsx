import { Heart, InstagramIcon, MessageSquare, Send } from 'lucide-react';
import React from 'react';

const profileBtns = ['Posts', 'Replies', 'Media'];

const page = () => {
  return (
    <div className="w-full mt-16 flex justify-center pt-10">
      <div className="bg-white dark:bg-[#181818] border border-[#D5D5D5] dark:border-[#2D2D2D] rounded-4xl w-full max-w-[90%] lg:max-w-[50%] transition-all overflow-y-auto">
        <div className="flex flex-col w-full gap-3 p-8 ">
          <div className="flex justify-between w-full p-4">
            <div className="">
              <h2 className="text-2xl font-bold">Yash</h2>
              <p>yashxp1</p>
            </div>
            <div className="border border-[#D5D5D5] dark:border-[#2D2D2D] h-18 w-18 rounded-full flex items-center justify-center">
              <img
                src="./pfp.png"
                alt="img"
                className="rounded-full object-cover"
              />
            </div>
          </div>

          <button className="border py-1 rounded-xl font-semibold cursor-pointer border-[#D5D5D5] dark:border-[#2D2D2D]">
            Edit profile
          </button>
        </div>

        <div className="border-t border-[#D5D5D5] dark:border-[#2D2D2D]"></div>

        <div className="flex justify-evenly py-5">
          {profileBtns.map((item, idx) => (
            <div
              key={idx}
              className="border cursor-pointer dark:hover:bg-iconBg hover:bg-gray-200  transition-all  border-[#D5D5D5] dark:border-[#2D2D2D] rounded-lg px-6 py-1.5"
            >
              <button>{item}</button>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center text-3xl py-10 font-extrabold text-gray-700">
          WOW!! it's all empty. start posting!!!
        </div>
      </div>
    </div>
  );
};

export default page;
