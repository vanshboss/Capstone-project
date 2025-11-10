
import React from 'react';
import { LogoIcon } from './Icons';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-sm p-8 space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center space-y-4">
          <LogoIcon className="h-12 w-12 text-indigo-500" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to ConnectSphere
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300">
            This is a frontend demo. Click the button below to log in as a mock user and explore the feed.
          </p>
        </div>
        <button
          onClick={onLogin}
          className="w-full px-4 py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
        >
          Log In / Continue
        </button>
      </div>
    </div>
  );
};

export default Login;
