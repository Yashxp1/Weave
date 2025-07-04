'use client';
import React, { useEffect, useState } from 'react';
import { Heart, MessageSquare, Repeat2, Send } from 'lucide-react';
import { useAuthStore } from '@/store/apiStore';
import { formatDistanceToNow } from 'date-fns';
import { SkeletonCard } from './Skeleton';
import Image from 'next/image';

const PostCard = () => {
  const { posts, getPosts, isLoading, likePost, repostPost } = useAuthStore();

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="w-full flex flex-col items-center pt-10 gap-6">
      {isLoading ? (
        <div className="space-y-5">
          <SkeletonCard></SkeletonCard>
          <SkeletonCard></SkeletonCard>
          <SkeletonCard></SkeletonCard>
          <SkeletonCard></SkeletonCard>
        </div>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className=" border border-[#D5D5D5] dark:border-[#2D2D2D] rounded-xl w-full transition-all overflow-hidden"
          >
            <div className="flex w-full gap-3 p-8">
              <div className="flex">
                <img
                  src={post.author.profilePic || '/default-pfp.png'}
                  alt="pfp"
                  className="rounded-full h-10 w-10 object-cover border border-[#D5D5D5] dark:border-[#2D2D2D]"
                />
              </div>

              <div className="flex flex-col w-full">
                <div className="space-x-2 flex items-center">
                  <span className="font-semibold">{post.author.name}</span>
                  <span className="text-gray-600 dark:text-[#aaa] text-xs">
                    •{' '}
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>

                <p className="break-words pt-2">{post.content}</p>

                {post.image && (
                  <Image
                    // src={post.image}
                    src="/pfp.png"
                    width={1200}
                    height={1000}
                    // alt="pfp"
                    alt="Post"
                    className="rounded-xl border mt-4 max-h-[300px] object-cover"
                  />
                )}

                <div className="flex gap-4 pt-6  dark:text-gray-400">
                  <span className="flex hover:text-pink-500 hover:bg-gray-200 transition-all gap-2 items-center dark:hover:bg-[#1E1E1E] p-2 rounded-4xl">
                    <Heart
                      size={20}
                      fill={post.likedByUser ? 'red' : 'none'}
                      color={post.likedByUser ? 'red' : 'gray'}
                      onClick={() => likePost(post.id)}
                      className="cursor-pointer"
                    />

                    <span className="text-sm">{post._count.likes}</span>
                  </span>

                  <span
                    onClick={() => repostPost(post.id)}
                    className={`flex p-2 rounded-4xl gap-2 items-center transition-all hover:bg-gray-200 dark:hover:bg-[#1E1E1E] ${
                      post.ReposetedByUser ? 'text-green-500' : 'text-gray-500'
                    }`}
                  >
                    <Repeat2 size={20} />
                    <span className="text-sm">{post._count.reposts}</span>
                  </span>
                  <span className="flex hover:text-blue-500  hover:bg-gray-200 dark:hover:bg-[#1E1E1E] p-2 rounded-4xl gap-2 items-center">
                    <MessageSquare size={20} />
                    <span className="text-sm">{post._count.comments}</span>
                  </span>

                  <span className="flex hover:text-blue-500  hover:bg-gray-200 dark:hover:bg-[#1E1E1E] p-2 rounded-4xl gap-2 items-center">
                    <Send size={20} />
                    <span className="text-sm">{post._count.reposts}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostCard;
