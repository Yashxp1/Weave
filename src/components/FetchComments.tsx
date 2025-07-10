'use client';

import { useAuthStore } from '@/store/apiStore';
import { Heart, MessageSquare, Send } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import { formatDistanceToNow } from 'date-fns';

const FetchComments = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState<any>(null);
  const { getComments, isLoading } = useAuthStore();

  useEffect(() => {
    if (typeof postId === 'string') {
      getComments(postId).then((data) => setComments(data));
    }
  }, [postId]);

  if (!comments) {
    return (
      <div>
        <p>NO COMMENTS FOUND</p>
      </div>
    );
  }

  return (
    <div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="">
          {comments.comments.map((cmt: any) => (
            <div key={cmt.id} className="flex p-3 border-b">
              <img
                src={cmt.author.profilePic}
                alt="pfp"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex-1">
                <div className="flex gap-2">
                  <p className=" text-sm font-semibold">{cmt.author.name}</p>
                  <p className="text-xs text-gray-400 pt-0.5">
                    {' '}
                    {formatDistanceToNow(new Date(cmt.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>

                <p className="text-sm mt-1">{cmt.content}</p>
                <div className="flex items-center space-x-6 mt-2 py-2">
                  <Heart size={16} className="text-gray-500 " />
                  {/* <MessageSquare size={16} className="text-gray-500" />
                  <Send size={16} className="text-gray-500" /> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FetchComments;
