
import { User, Post, Comment } from '../types';

// --- Utility Functions ---
const generateId = (): string => Date.now().toString(36) + Math.random().toString(36).substring(2);

const getFromStorage = <T,>(key: string): T[] => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error(`Error reading from localStorage key “${key}”:`, error);
    return [];
  }
};

const saveToStorage = <T,>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing to localStorage key “${key}”:`, error);
  }
};

// --- User Management ---
const USERS_KEY = 'blog_users';

export const getUsers = (): User[] => getFromStorage<User>(USERS_KEY);

export const getUserById = (id: string): User | undefined => {
  return getUsers().find(user => user.id === id);
};

export const getUserByUsername = (username: string): User | undefined => {
  return getUsers().find(user => user.username.toLowerCase() === username.toLowerCase());
};

export const addUser = (user: Omit<User, 'id'>): User => {
  const users = getUsers();
  const newUser: User = { ...user, id: generateId() };
  saveToStorage(USERS_KEY, [...users, newUser]);
  return newUser;
};


// --- Post Management ---
const POSTS_KEY = 'blog_posts';

export const getPosts = (): Post[] => {
  return getFromStorage<Post>(POSTS_KEY).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getPostById = (id: string): Post | undefined => {
  return getPosts().find(post => post.id === id);
};

export const addPost = (post: Omit<Post, 'id' | 'createdAt'>): Post => {
  const posts = getFromStorage<Post>(POSTS_KEY);
  const newPost: Post = { ...post, id: generateId(), createdAt: new Date().toISOString() };
  saveToStorage(POSTS_KEY, [...posts, newPost]);
  return newPost;
};

export const updatePost = (updatedPost: Post): Post | null => {
  let posts = getFromStorage<Post>(POSTS_KEY);
  const index = posts.findIndex(p => p.id === updatedPost.id);
  if (index !== -1) {
    posts[index] = updatedPost;
    saveToStorage(POSTS_KEY, posts);
    return updatedPost;
  }
  return null;
};

export const deletePost = (postId: string): boolean => {
  const posts = getFromStorage<Post>(POSTS_KEY);
  const newPosts = posts.filter(p => p.id !== postId);
  if (posts.length !== newPosts.length) {
    saveToStorage(POSTS_KEY, newPosts);
    // Also delete associated comments
    const comments = getFromStorage<Comment>(COMMENTS_KEY);
    const commentsForOtherPosts = comments.filter(c => c.postId !== postId);
    saveToStorage(COMMENTS_KEY, commentsForOtherPosts);
    return true;
  }
  return false;
};


// --- Comment Management ---
const COMMENTS_KEY = 'blog_comments';

export const getComments = (): Comment[] => getFromStorage<Comment>(COMMENTS_KEY);

export const getCommentsByPostId = (postId: string): Comment[] => {
  return getComments()
    .filter(c => c.postId === postId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};

export const addComment = (comment: Omit<Comment, 'id' | 'createdAt'>): Comment => {
  const comments = getComments();
  const newComment: Comment = { ...comment, id: generateId(), createdAt: new Date().toISOString() };
  saveToStorage(COMMENTS_KEY, [...comments, newComment]);
  return newComment;
};