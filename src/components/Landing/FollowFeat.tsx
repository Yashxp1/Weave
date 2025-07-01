import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';

const FollowFeat = () => {
  const people = [
    {
      img: (
        <Image
          src="/user2.jpg"
          alt="screenshot"
          width={800}
          height={600}
          className="rounded-2xl shadow-lg"
        />
      ),
      name: 'Ema',
      btn: (
        <Button size="sm" variant="outline">
          follow
        </Button>
      ),
    },
    {
      img: (
        <Image
          src="/user1.avif"
          alt="screenshot"
          width={800}
          height={600}
          className="rounded-2xl shadow-lg"
        />
      ),
      name: 'Luke',
      btn: (
        <Button size="sm" variant="outline">
          follow
        </Button>
      ),
    },
    {
      img: (
        <Image
          src="/user2.jpg"
          alt="screenshot"
          width={800}
          height={600}
          className="rounded-2xl shadow-lg"
        />
      ),
      name: 'Vienna',
      btn: (
        <Button size="sm" variant="outline">
          follow
        </Button>
      ),
    },
    {
      img: (
        <Image
          src="/user3.jpg"
          alt="screenshot"
          width={800}
          height={600}
          className="rounded-2xl shadow-lg"
        />
      ),
      name: 'Drake',
      btn: (
        <Button size="sm" variant="outline">
          follow
        </Button>
      ),
    },
  ];

  return (
    <div>
      <p>Follow people you find interesting</p>
    </div>
  );
};

export default FollowFeat;
