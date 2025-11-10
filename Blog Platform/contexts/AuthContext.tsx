
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import * as db from '../services/db';
import toast from 'react-hot-toast';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  signup: (username: string, password: string) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUserId = sessionStorage.getItem('blog_current_user_id');
      if (storedUserId) {
        const user = db.getUserById(storedUserId);
        if (user) {
          const { password, ...userWithoutPassword } = user;
          setCurrentUser(userWithoutPassword);
        }
      }
    } catch (error) {
        console.error("Failed to load user from session storage", error);
    } finally {
        setLoading(false);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const user = db.getUserByUsername(username);
    if (user && user.password === password) {
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      sessionStorage.setItem('blog_current_user_id', user.id);
      toast.success(`Welcome back, ${user.username}!`);
      return true;
    }
    toast.error('Invalid username or password.');
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('blog_current_user_id');
    toast.success('You have been logged out.');
  };

  const signup = (username: string, password: string): boolean => {
    if (db.getUserByUsername(username)) {
      toast.error('Username already exists.');
      return false;
    }
    const newUser = db.addUser({ username, password });
    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    sessionStorage.setItem('blog_current_user_id', newUser.id);
    toast.success(`Welcome, ${newUser.username}!`);
    return true;
  };

  const value = { currentUser, loading, login, logout, signup };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
