
import React, { useState } from 'react';
import { Comment, User } from '../types';

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  currentUser: User;
  allUsers: User[];
  onComment: (postId: string, text: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, comments, currentUser, allUsers, onComment }) => {
  const [newComment, setNewComment] = useState('');
  
  const getUserById = (id: string) => allUsers.find(user => user.id === id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(postId, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div className="space-y-4">
        {comments.map(comment => {
          const author = getUserById(comment.authorId);
          return (
            <div key={comment.id} className="flex items-start space-x-3">
              <img src={author?.avatarUrl} alt={author?.name} className="w-8 h-8 rounded-full object-cover" />
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex-1">
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{author?.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{comment.text}</p>
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex items-center space-x-3">
        <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover" />
        <input
          type="text"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button type="submit" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200 font-semibold" disabled={!newComment.trim()}>
          Post
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
