
import { User, Post } from './types';

export const MOCK_USERS: User[] = [
  { id: 'user-1', name: 'Alex Johnson', avatarUrl: 'https://picsum.photos/id/1011/100/100' },
  { id: 'user-2', name: 'Maria Garcia', avatarUrl: 'https://picsum.photos/id/1025/100/100' },
  { id: 'user-3', name: 'Ken Adams', avatarUrl: 'https://picsum.photos/id/1005/100/100' },
  { id: 'user-4', name: 'Sophie Miller', avatarUrl: 'https://picsum.photos/id/237/100/100' },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'post-1',
    content: 'Just enjoying a beautiful day at the park. The weather is perfect for a long walk! 🌳☀️',
    imageUrl: 'https://picsum.photos/id/1015/600/400',
    authorId: 'user-2',
    timestamp: '2024-07-22T10:30:00Z',
    likes: ['user-1', 'user-3'],
    comments: [
      { id: 'comment-1', text: 'Looks amazing!', authorId: 'user-1', timestamp: '2024-07-22T10:35:00Z' },
      { id: 'comment-2', text: 'I wish I was there!', authorId: 'user-3', timestamp: '2024-07-22T10:40:00Z' },
    ],
  },
  {
    id: 'post-2',
    content: 'My new coding setup is finally complete! Ready to build some amazing projects. #developer #coding #setup',
    authorId: 'user-1',
    timestamp: '2024-07-22T09:00:00Z',
    likes: ['user-2', 'user-4'],
    comments: [
        { id: 'comment-3', text: 'Sweet setup!', authorId: 'user-4', timestamp: '2024-07-22T09:15:00Z' },
    ],
  },
  {
    id: 'post-3',
    content: 'Exploring the city streets and found this hidden gem of a coffee shop. ☕️',
    imageUrl: 'https://picsum.photos/id/1060/600/400',
    authorId: 'user-3',
    timestamp: '2024-07-21T15:00:00Z',
    likes: ['user-1', 'user-2', 'user-4'],
    comments: [],
  },
  {
    id: 'post-4',
    content: 'My dog is enjoying the beach more than I am! 🐾',
    imageUrl: 'https://picsum.photos/id/237/600/400',
    authorId: 'user-4',
    timestamp: '2024-07-20T12:00:00Z',
    likes: [],
    comments: [],
  },
];
