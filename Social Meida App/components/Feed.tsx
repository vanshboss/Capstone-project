
import React from 'react';
import { Post, User } from '../types';
import PostCard from './PostCard';

interface FeedProps {
  posts: Post[];
  users: User[];
  currentUser: User;
  onLike: (postId: string) => void;
  onComment: (postId: string, text: string) => void;
  onEditPost: (postId: string, newContent: string) => void;
  onDeletePost: (postId: string) => void;
  isLoading: boolean;
}

const FeedSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md animate-pulse mb-6">
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full mr-4"></div>
      <div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-2"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
      </div>
    </div>
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-4"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6 mb-4"></div>
    <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
  </div>
);


const Feed: React.FC<FeedProps> = ({ posts, users, currentUser, onLike, onComment, onEditPost, onDeletePost, isLoading }) => {
  const getUserById = (id: string) => users.find(user => user.id === id);

  if (isLoading) {
    return (
      <div>
        <FeedSkeleton />
        <FeedSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          author={getUserById(post.authorId)}
          currentUser={currentUser}
          onLike={onLike}
          onComment={onComment}
          onEditPost={onEditPost}
          onDeletePost={onDeletePost}
          allUsers={users}
        />
      ))}
    </div>
  );
};

export default Feed;
