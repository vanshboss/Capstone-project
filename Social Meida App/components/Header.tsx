
import React from 'react';
import { User } from '../types';
import { LogoIcon } from './Icons';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <LogoIcon className="h-8 w-8 text-indigo-500" />
            <span className="text-xl font-bold text-gray-800 dark:text-gray-200">ConnectSphere</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-gray-700 dark:text-gray-300 hidden sm:block">Welcome, {user.name}</span>
            <div className="relative group">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-10 h-10 rounded-full cursor-pointer object-cover"
              />
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 hidden group-hover:block">
                <button
                  onClick={onLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
