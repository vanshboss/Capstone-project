
export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Comment {
  id: string;
  text: string;
  authorId: string;
  timestamp: string;
}

export interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  authorId: string;
  timestamp: string;
  likes: string[]; // Array of user IDs
  comments: Comment[];
}
