
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';
import Button from './Button';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState<'login' | 'signup'>('login');

  const openModal = (view: 'login' | 'signup') => {
    setModalView(view);
    setIsModalOpen(true);
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                GeminiBlog
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              {currentUser ? (
                <>
                  <span className="hidden sm:inline text-gray-700 dark:text-gray-300">
                    Hello, <span className="font-semibold">{currentUser.username}</span>
                  </span>
                  <Link to="/create">
                     <Button>New Post</Button>
                  </Link>
                  <Button variant="secondary" onClick={logout}>Logout</Button>
                </>
              ) : (
                <>
                  <Button variant="secondary" onClick={() => openModal('login')}>Login</Button>
                  <Button onClick={() => openModal('signup')}>Sign Up</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <AuthModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} initialView={modalView} />
    </>
  );
};

export default Navbar;
