
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import * as db from '../services/db';
import { Post } from '../types';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import toast from 'react-hot-toast';

const EditPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!postId) {
      navigate('/');
      return;
    }
    const postToEdit = db.getPostById(postId);
    if (!postToEdit) {
      toast.error("Post not found.");
      navigate('/');
      return;
    }
    if (!currentUser || currentUser.id !== postToEdit.authorId) {
      toast.error("You are not authorized to edit this post.");
      navigate(`/post/${postId}`);
      return;
    }
    setPost(postToEdit);
    setTitle(postToEdit.title);
    setContent(postToEdit.content);
  }, [postId, currentUser, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !title.trim() || !content.trim()) {
      toast.error("Title and content cannot be empty.");
      return;
    }

    const updatedPost: Post = { ...post, title, content };
    db.updatePost(updatedPost);
    
    toast.success("Post updated successfully!");
    navigate(`/post/${post.id}`);
  };

  if (!post) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Title"
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          label="Content"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          required
        />
        <div className="flex justify-end space-x-4">
            <Button type="button" variant="secondary" onClick={() => navigate(`/post/${post.id}`)}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};

export default EditPostPage;
