import Image from 'next/image';
import React from 'react';

const Feedback = () => {
  const samplePosts = [
    {
      img: (
        <Image
          src="/user1.avif"
          alt="screenshot"
          width={800}
          height={600}
          className="rounded-full shadow-lg w-12 h-12 object-cover"
        />
      ),
      name: 'James Carter',
      username: '@jamesthedev',
      text: "I fixed a bug at 3 AM last night. Now I have no idea what I fixed, why it worked or if it even should work. But it's working, so I'm not touching it ever again.",
    },
    {
      img: (
        <Image
          src="/user2.jpg"
          alt="screenshot"
          width={800}
          height={600}
          className="rounded-full shadow-lg w-12 h-12 object-cover"
        />
      ),
      name: 'Emily Brooks',
      username: '@emcodes',
      text: 'Interviewer: "Can you explain this gap on your resume?"Me: "Yeah, that\'s when I was waiting for npm to install."They didn\'t laugh. I didn\'t get the job. No regrets.',
    },
    {
      img: (
        <Image
          src="/user3.jpg"
          alt="screenshot"
          width={800}
          height={600}
          className="rounded-full shadow-lg w-12 h-12 object-cover"
        />
      ),
      name: 'Daniel Smith',
      username: '@daniel404',
      text: "My code works. I don't know why. If I touch it, it'll break If I don't, my manager will. So now we just stare at it together in fear.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {samplePosts.map((post, idx) => (
          <div
            key={idx}
            className="border bg-gradient-to-tl from-yellow-50 to-pink-50
             border-gray-200 bg-white rounded-lg  p-6 hover:shadow-sm transition-shadow duration-300 flex flex-col h-full"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0">{post.img}</div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 truncate">
                  {post.name}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {post.username}
                </p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed flex-1">
              {post.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
