
import React, { useState, useEffect } from 'react';
import { Comment, User } from '../types';
import * as db from '../services/db';

interface CommentViewProps {
  comment: Comment;
}

const CommentView: React.FC<CommentViewProps> = ({ comment }) => {
  const [author, setAuthor] = useState<User | null>(null);

  useEffect(() => {
    const user = db.getUserById(comment.authorId);
    if (user) {
      setAuthor(user);
    }
  }, [comment.authorId]);

  return (
    <div className="flex space-x-4">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-indigo-200 dark:bg-indigo-800 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-300">
          {author?.username.charAt(0).toUpperCase()}
        </div>
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <p className="font-semibold text-gray-800 dark:text-gray-100">{author?.username || 'Anonymous'}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mt-1">{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentView;
