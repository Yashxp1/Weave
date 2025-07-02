import PostCard from './PostCard';

const Feed = () => {
  return (
    <main className="flex-1">
      <div className="p-4 space-y-4">
        {/* Your posts go here */}
        <p className="">
          <PostCard></PostCard>
        </p>
      </div>
    </main>
  );
};

export default Feed;
