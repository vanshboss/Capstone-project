
import React, { useState, useEffect, useCallback } from 'react';
import { Post, User, Comment } from './types';
import { MOCK_POSTS, MOCK_USERS } from './constants';
import Login from './components/Login';
import Header from './components/Header';
import Feed from './components/Feed';
import CreatePost from './components/CreatePost';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Simulate fetching initial data
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setPosts(MOCK_POSTS.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleLogin = useCallback(() => {
    // In a real app, this would involve an API call.
    // Here we just pick a mock user.
    const user = MOCK_USERS[0]; 
    setCurrentUser(user);
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  }, []);

  const handleCreatePost = useCallback((content: string, image?: string) => {
    if (!currentUser) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      content,
      imageUrl: image,
      authorId: currentUser.id,
      timestamp: new Date().toISOString(),
      likes: [],
      comments: [],
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
  }, [currentUser]);

  const handleLikePost = useCallback((postId: string) => {
    if (!currentUser) return;
    setPosts(posts.map(post => {
      if (post.id === postId) {
        if (post.likes.includes(currentUser.id)) {
          // Unlike
          return { ...post, likes: post.likes.filter(id => id !== currentUser.id) };
        } else {
          // Like
          return { ...post, likes: [...post.likes, currentUser.id] };
        }
      }
      return post;
    }));
  }, [posts, currentUser]);

  const handleAddComment = useCallback((postId: string, text: string) => {
    if (!currentUser) return;
    
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      text,
      authorId: currentUser.id,
      timestamp: new Date().toISOString(),
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    }));
  }, [posts, currentUser]);

  const handleEditPost = useCallback((postId: string, newContent: string) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, content: newContent } : p));
  }, [posts]);

  const handleDeletePost = useCallback((postId: string) => {
    setPosts(posts.filter(p => p.id !== postId));
  }, [posts]);

  if (!isAuthenticated || !currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Header user={currentUser} onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <CreatePost user={currentUser} onCreatePost={handleCreatePost} />
            <Feed
              posts={posts}
              users={MOCK_USERS}
              currentUser={currentUser}
              onLike={handleLikePost}
              onComment={handleAddComment}
              onEditPost={handleEditPost}
              onDeletePost={handleDeletePost}
              isLoading={isLoading}
            />
          </div>
          <aside className="hidden md:block">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">Suggestions</h3>
                {MOCK_USERS.filter(u => u.id !== currentUser.id).slice(0, 3).map(user => (
                  <div key={user.id} className="flex items-center space-x-3 my-3">
                    <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Suggested for you</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default App;
