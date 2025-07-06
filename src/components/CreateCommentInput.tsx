'use client';

import React, { ReactEventHandler, useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/store/apiStore';
import { Content } from 'next/font/google';

const CreateCommentInput = () => {
  const { postId } = useParams();
  const { postComments, isLoading } = useAuthStore();

  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (typeof postId === 'string') {
      const res = await postComments(postId, inputValue);
      setInputValue('');
      // if (res.message === 'comment created') {
      // }
    }
  };

  console.log(inputValue);

  return (
    <form onSubmit={handleSubmit}>
      <div className="pt-6 flex gap-2 ">
        <Input value={inputValue}  onChange={(e) => setInputValue(e.target.value)} placeholder="Post your reply" />
        <Button
          type="submit"
          disabled={isLoading}
          variant="outline"
          className=""
        >
          {isLoading ? 'Posting...' : 'Reply'}
        </Button>
      </div>
    </form>
  );
};

export default CreateCommentInput;
