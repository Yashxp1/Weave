import React from 'react';
import Video from '../icons/Video';
import Chat from '../icons/Chat';
import FollowFeat from './FollowFeat';
import Image from 'next/image';
import { Button } from '../ui/button';

const Features = () => {

  return (
    <div>
      <div className="flex py-10 hover:border-gray-300 rounded-xl justify-center border">
        <div className="flex justify-center items-center gap-4 2xl:w-[60%] p-8 ">
          <FollowFeat />
        </div>
      </div>
    </div>
  );
};

export default Features;
