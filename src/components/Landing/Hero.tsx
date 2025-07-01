import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { CirclePlay } from 'lucide-react';
import Feedback from './Feedback';
import Features from './Features';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-pink-200 via-yellow-100 to-yellow-200 h-screen rounded-3xl border border-yellow-400 md:mt-2 mx-2">
      <div className="md:pt-42 pt-24 flex justify-center">
        <div className="md:w-[70%] w-[90%] text-center">
          <h1 className="text-6xl text-[#240029] font-[900] mb-4">
            Built for thinkers. Fueled by chaos.
          </h1>
          <p className="text-lg leading-relaxed text-gray-700">
            Post in <b> real-time</b>, <b>reply instantly</b>, and{' '}
            <b>build dynamic threads </b> that matter. <b>Follow creators</b>,{' '}
            <b>explore trending topics</b>, and
            <b> personalize your digital feed</b>. Built for{' '}
            <b>raw expression</b>, <b>zero noise</b>, and{' '}
            <b>complete control</b> — this is your playground.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row  gap-4 md:pt-0 mt-10 justify-center items-center">
        <Button
          size="lg"
          variant="outline"
          className="font-semibold hover:bg-yellow-300 bg-yellow-400 border-yellow-600"
        >
          Create a free account
        </Button>
        <Button size="lg" className="font-semibold">
          Know more about weave
        </Button>
      </div>

      <div className="md:pt-15 pt-10  flex justify-center">
        <div className="p-1.5 shadow-2xs bg-white/30 border border-gray-300 py-2  rounded-2xl backdrop-blur-lg">
          <Image
            src="/ss.png"
            alt="screenshot"
            width={1200}
            height={1000}
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>
      <div className="flex py-5 justify-center">
        <div className="px-3 cursor-pointer flex justify-center items-center gap-2 shadow-2xs bg- border bg-gradient-to-r from-pink-100 to-purple-200 border-gray-300 py-2  rounded-full backdrop-blur-lg">
          <span className="bg-red-500 rounded-full">
            <CirclePlay color="white" />
          </span>
          <p className="font-semibold">See how weave works</p>
        </div>
      </div>
      <div className="flex py-10 justify-center">
        <div className="flex 2xl:w-[60%]  justify-center items-center">
          <p className="text-4xl text-center font-extrabold">
            A real-time feed of thoughts, opinions, and chaos — yours and
            everyone else's.
          </p>
        </div>
      </div>

      <div className="md:px-24">
        <Feedback />
      </div>

      <div>
        <div className="flex justify-center items-center pt-12">
          <p className="text-4xl font-extrabold">Wait, There's more!</p>
        </div>
        <div>
          <Features />
        </div>
      </div>
    </div>
  );
};

export default Hero;
