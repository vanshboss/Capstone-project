
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/post/:postId" element={<PostPage />} />
              <Route path="/create" element={<CreatePostPage />} />
              <Route path="/edit/:postId" element={<EditPostPage />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
