
import React, { useState } from 'react';
import { User } from '../types';
import { PhotoIcon } from './Icons';

interface CreatePostProps {
  user: User;
  onCreatePost: (content: string, image?: string) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ user, onCreatePost }) => {
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onCreatePost(content, imagePreview || undefined);
      setContent('');
      setImagePreview(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
      <div className="flex items-start space-x-4">
        <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
        <form onSubmit={handleSubmit} className="w-full">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's on your mind, ${user.name}?`}
            className="w-full p-2 text-lg border-none focus:ring-0 resize-none bg-transparent dark:text-gray-200 dark:placeholder-gray-400"
            rows={3}
          />
           {imagePreview && (
              <div className="mt-2 relative">
                <img src={imagePreview} alt="Preview" className="rounded-lg w-full max-h-60 object-cover" />
                <button
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75"
                >
                  &#x2715;
                </button>
              </div>
            )}
          <div className="flex justify-between items-center mt-2">
            <div>
                <label htmlFor="file-upload" className="cursor-pointer text-gray-500 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400">
                    <PhotoIcon className="h-6 w-6"/>
                </label>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageUpload} accept="image/*" />
            </div>
            <button
              type="submit"
              disabled={!content.trim()}
              className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
