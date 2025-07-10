import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { useAuthStore } from '@/store/apiStore';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

export function Modal() {
  const { createPost, isLoading } = useAuthStore();
  const [inputValue, setInputValue] = useState('');

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    await createPost(inputValue);
    setInputValue('');
  };

  return (
  <Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">
      <Plus /> Create Post
    </Button>
  </DialogTrigger>

  <DialogContent className="sm:max-w-[425px]">
    <form onSubmit={handleCreatePost}>
      <DialogHeader>
        <DialogTitle>Create a new post</DialogTitle>
        <DialogDescription>
          Let everyone know what's on your mind!
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4">
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Write your post here..."
          className="resize-none"
        />
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Posting...' : 'Post'}
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>

  );
}
