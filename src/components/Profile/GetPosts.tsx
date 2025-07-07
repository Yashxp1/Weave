import { useAuthStore } from '@/store/apiStore';
import { Heart, Repeat2, Share2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { RiHeart2Fill } from 'react-icons/ri';

const GetPosts = () => {
  const { profile, getProfile, isLoading } = useAuthStore();

  if (isLoading) return <p>Loading profile...</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <div className=''>
      {profile.posts.map((post) => (
        <div key={post.id} className="border-b py-2">
          <p className="text-sm text-muted-foreground mb-2">
            {new Date(post.createdAt).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
          <p className="text-foreground">{post.content}</p>

          {post.image && (
            <img
              src={post.image}
              alt="Post Image"
              className="mt-2 rounded-md max-h-96 object-cover"
            />
          )}
          <div className="flex gap-4 text-black/50 dark:text-white/50 pt-2.5">
            <Heart size={18} className=''/>
            <Share2 size={18} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetPosts;
