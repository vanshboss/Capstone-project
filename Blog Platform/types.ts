
export interface User {
  id: string;
  username: string;
  password?: string; // Only for storage, don't expose on client
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  createdAt: string;
}
