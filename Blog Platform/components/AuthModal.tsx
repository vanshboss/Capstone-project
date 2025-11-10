
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Input from './Input';
import Button from './Button';

interface AuthModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  initialView: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, setIsOpen, initialView }) => {
  const [isLoginView, setIsLoginView] = useState(initialView === 'login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup } = useAuth();

  useEffect(() => {
    setIsLoginView(initialView === 'login');
  }, [initialView]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let success = false;
    if (isLoginView) {
      success = login(username, password);
    } else {
      success = signup(username, password);
    }
    if (success) {
      setUsername('');
      setPassword('');
      setIsOpen(false);
    }
  };

  const handleSwitchView = () => {
    setIsLoginView(!isLoginView);
    setUsername('');
    setPassword('');
  };
  
  const handleClose = () => {
      setUsername('');
      setPassword('');
      setIsOpen(false);
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={handleClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-center mb-6">{isLoginView ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            label="Username" 
            id="username"
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            autoComplete="username"
          />
          <Input 
            label="Password" 
            id="password"
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            autoComplete={isLoginView ? "current-password" : "new-password"}
          />
          <Button type="submit" className="w-full">{isLoginView ? 'Login' : 'Sign Up'}</Button>
        </form>
        <div className="mt-6 text-center">
          <button onClick={handleSwitchView} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
            {isLoginView ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
