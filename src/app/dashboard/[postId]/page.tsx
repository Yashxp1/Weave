'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/store/apiStore';
import Image from 'next/image';
import { SkeletonCard } from '@/components/Skeleton';
import { Heart, MessageSquare, Repeat2, Send } from 'lucide-react';
import CommentInput from '@/components/CommentInput';

const SinglePostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<any>(null);

  const { getSinglePost, likePost, repostPost } = useAuthStore();

  useEffect(() => {
    if (typeof postId === 'string') {
      getSinglePost(postId).then((data) => {
        setPost(data);
      });
    }
  }, [postId]);

  if (!post)
    return (
      <div className="p-6">
        <SkeletonCard />
      </div>
    );

  return (
    <div className="p-6 border-b">
      <div className="border-b pb-2">
        <div className="flex gap-3">
          <img
            src={post.author.profilePic || '/default-pfp.png'}
            alt="pfp"
            className="rounded-full border h-10 w-10 object-cover"
          />
          <div>
            <p className="font-semibold">{post.author.name}</p>
            <p className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="mt-4">{post.content}</p>
        {post.image && (
          <Image
            src={post.image}
            width={1000}
            height={600}
            alt="Post"
            className="rounded-lg mt-4 object-cover max-h-[300px]"
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
      <div>
        <p></p>
        <CommentInput />
      </div>
    </div>
  );
};

export default SinglePostPage;
