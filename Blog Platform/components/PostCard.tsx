
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Post, User } from '../types';
import * as db from '../services/db';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [author, setAuthor] = useState<User | null>(null);

  useEffect(() => {
    const user = db.getUserById(post.authorId);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      setAuthor(userWithoutPassword);
    }
  }, [post.authorId]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <div className="p-6">
        <div className="flex items-center mb-4 text-sm text-gray-500 dark:text-gray-400">
          <span>By {author ? author.username : 'Unknown'}</span>
          <span className="mx-2">•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100 line-clamp-2">
          <Link to={`/post/${post.id}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
          {post.content}
        </p>
        <Link to={`/post/${post.id}`} className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
          Read more &rarr;
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
