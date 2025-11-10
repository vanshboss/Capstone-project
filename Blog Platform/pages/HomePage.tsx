
import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import { Post } from '../types';
import * as db from '../services/db';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPosts(db.getPosts());
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-center">Loading posts...</div>;
  }
  
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">Latest Posts</h1>
      {posts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">No posts yet!</h2>
            <p className="text-gray-600 dark:text-gray-400">Why don't you create the first one?</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
