'use client';

import React, { useEffect } from 'react';
import { Heart, MessageSquare, Repeat2, Send } from 'lucide-react';
import { useAuthStore } from '@/store/apiStore';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { SkeletonCard } from './Skeleton';

const PostCard = () => {
  const { posts, getPosts, isLoading } = useAuthStore();

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="w-full flex flex-col items-center pt-10 gap-6">
      {isLoading ? (
        <div className='space-y-5'>
         <SkeletonCard></SkeletonCard>
         <SkeletonCard></SkeletonCard>
         <SkeletonCard></SkeletonCard>
         <SkeletonCard></SkeletonCard>
        </div>
      ) : (
        // <p className="text-muted-foreground">Loading posts...</p>
        posts.map((post) => (
          <div
            key={post.id}
            className=" border border-[#D5D5D5] dark:border-[#2D2D2D] rounded-xl w-full transition-all overflow-hidden"
          >
            <div className="flex w-full gap-3 p-8">
              {/* Profile Picture */}
              <div className="flex">
                <img
                  src={post.author.profilePic || '/default-pfp.png'}
                  alt="pfp"
                  className="rounded-full h-10 w-10 object-cover border border-[#D5D5D5] dark:border-[#2D2D2D]"
                />
              </div>

              {/* Post Content */}
              <div className="flex flex-col w-full">
                <div className="space-x-2 flex items-center">
                  <span className="font-semibold">{post.author.name}</span>
                  <span className="text-[#2D2D2D] dark:text-[#aaa] text-sm">
                    •{' '}
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>

                <p className="break-words pt-2">{post.content}</p>

                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="rounded-xl border mt-4 max-h-[300px] object-cover"
                  />
                )}

                {/* Actions */}
                <div className="flex gap-4 pt-6  dark:text-gray-400">
                  <span className="flex hover:text-pink-500 hover:bg-gray-200 transition-all gap-2 items-center dark:hover:bg-[#1E1E1E] p-2 pl-0 rounded-4xl">
                    <Heart size={20} />
                    <span className="text-sm">{post._count.likes}</span>
                  </span>

                  <span className="flex hover:text-green-500  hover:bg-gray-200 dark:hover:bg-[#1E1E1E] p-2 rounded-4xl gap-2 items-center">
                    <Repeat2 size={20} />
                    <span className="text-sm">{post._count.comments}</span>
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
