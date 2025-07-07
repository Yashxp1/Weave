'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useAuthStore } from '@/store/apiStore';
import { date } from 'zod';
import GetPosts from './GetPosts';
import Link from 'next/link';

const Profile = () => {
  const { profile, getProfile, isLoading } = useAuthStore();

  useEffect(() => {
    getProfile();
  }, []);

  if (isLoading) return <p>Loading profile...</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <div className="max-w-2xl mx-auto bg-background min-h-screen">
      <div>
        <div className="pt-8 px-4">
          <div className="mb-6">
            <div className="w-32 h-32 rounded-full border-4 border-background bg-muted flex items-center justify-center overflow-hidden">
              <Image
                src="/pfp.png"
                width={1200}
                height={1000}
                alt="pfp"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mb-4">
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
            {/* <Button size="sm">Follow</Button> */}
          </div>

          <div className="mb-4">
            <h1 className="text-2xl font-bold text-foreground">
              {profile.name}
            </h1>
            <p className="text-muted-foreground">{profile.email}</p>
          </div>

          <div className="mb-4">
            <p className="text-foreground">
              Software Developer | React Enthusiast | Building cool stuff on the
              web 🚀
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
            {/* <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>San Francisco, CA</span>
            </div> */}
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                Joined{' '}
                {new Date(profile.createdAt).toLocaleString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>

          <div className="flex gap-6 mb-6">
            <div className="flex items-center gap-1">
              <span className="font-bold text-foreground">
                {profile.followerCount}
              </span>
              <span className="text-muted-foreground">Followers</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-foreground">
                {profile.followingCount}
              </span>
              <span className="text-muted-foreground">Following</span>
            </div>
          </div>

          <div className="border-b border-border">
            <nav className="flex justify-evenly pb-2">
              <Button variant='ghost' className="">
                Posts
              </Button>

              <Link href="/profile/replies">
                <Button variant='ghost' className="">Replies</Button>
              </Link>

              <Link href="/profile/likes">
                <Button variant='ghost' className="">Likes</Button>
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className=" py-4 border-b px-6 text-md">
        <GetPosts></GetPosts>
      </div>
    </div>
  );
};

export default Profile;
