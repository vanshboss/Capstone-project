
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import * as db from '../services/db';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import toast from 'react-hot-toast';

const CreatePostPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      toast.error("You must be logged in to create a post.");
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !currentUser) {
        toast.error("Title and content cannot be empty.");
        return;
    }

    const newPost = db.addPost({
      title,
      content,
      authorId: currentUser.id,
    });
    
    toast.success("Post created successfully!");
    navigate(`/post/${newPost.id}`);
  };

  if (!currentUser) {
    return null; // or a loading spinner, but useEffect redirects
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>
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
            <Button type="button" variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit">Publish Post</Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
