
import React, { useState } from 'react';
import { Post, User } from '../types';
import { HeartIcon, ChatBubbleIcon, PencilIcon, TrashIcon, EllipsisHorizontalIcon } from './Icons';
import CommentSection from './CommentSection';

interface PostCardProps {
  post: Post;
  author?: User;
  currentUser: User;
  allUsers: User[];
  onLike: (postId: string) => void;
  onComment: (postId: string, text: string) => void;
  onEditPost: (postId: string, newContent: string) => void;
  onDeletePost: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, author, currentUser, allUsers, onLike, onComment, onEditPost, onDeletePost }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  const isLiked = post.likes.includes(currentUser.id);
  const isOwner = post.authorId === currentUser.id;

  const handleEditSave = () => {
    onEditPost(post.id, editedContent);
    setIsEditing(false);
  };
  
  const timeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "m";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m";
    return Math.floor(seconds) + "s";
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
            <img src={author?.avatarUrl} alt={author?.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
            <div>
              <p className="font-bold text-gray-800 dark:text-gray-200">{author?.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{timeAgo(post.timestamp)}</p>
            </div>
        </div>
        {isOwner && (
          <div className="relative">
            <button onClick={() => setShowMenu(!showMenu)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <EllipsisHorizontalIcon className="h-6 w-6" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-10">
                <button onClick={() => { setIsEditing(true); setShowMenu(false); }} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <PencilIcon className="h-4 w-4 mr-2" /> Edit
                </button>
                <button onClick={() => { onDeletePost(post.id); setShowMenu(false); }} className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <TrashIcon className="h-4 w-4 mr-2" /> Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        <div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button onClick={() => setIsEditing(false)} className="px-3 py-1 text-sm rounded bg-gray-200 dark:bg-gray-600">Cancel</button>
            <button onClick={handleEditSave} className="px-3 py-1 text-sm rounded bg-indigo-500 text-white">Save</button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap">{post.content}</p>
      )}

      {post.imageUrl && !isEditing && (
        <img src={post.imageUrl} alt="Post content" className="rounded-lg w-full object-cover max-h-96 mb-4" />
      )}
      
      <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-6">
          <button onClick={() => onLike(post.id)} className="flex items-center space-x-2 hover:text-red-500 transition-colors">
            <HeartIcon className={`h-6 w-6 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
            <span>{post.likes.length}</span>
          </button>
          <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-2 hover:text-indigo-500 transition-colors">
            <ChatBubbleIcon className="h-6 w-6" />
            <span>{post.comments.length}</span>
          </button>
        </div>
      </div>
      
      {showComments && (
        <CommentSection 
          postId={post.id}
          comments={post.comments} 
          currentUser={currentUser}
          allUsers={allUsers}
          onComment={onComment}
        />
      )}
    </div>
  );
};

export default PostCard;
