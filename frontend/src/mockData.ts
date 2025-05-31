
import { Post, User } from './types';

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'John Smith',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'student'
  },
  {
    id: 'user2',
    name: 'Jane Doe',
    avatar: 'https://i.pravatar.cc/150?img=5',
    role: 'teacher'
  },
  {
    id: 'user3',
    name: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/150?img=3',
    role: 'moderator'
  },
  {
    id: 'user4',
    name: 'Sarah Williams',
    avatar: 'https://i.pravatar.cc/150?img=9',
    role: 'admin'
  }
];

export const mockPosts: Post[] = [
  {
    id: 'post1',
    title: 'Summer Internship Opportunity at Tech Giants',
    content: 'Full detailed content of the post goes here...',
    excerpt: 'Exciting internship opportunities for students looking to gain experience in software development, product management, and UX design at major tech companies.',
    category: 'internships',
    author: mockUsers[0],
    createdAt: '2025-05-10T10:00:00Z',
    likes: 42,
    bookmarked: false
  },
  {
    id: 'post2',
    title: 'Building a Full-Stack Project with React and Node.js',
    content: 'Full detailed content of the post goes here...',
    excerpt: 'Learn how to build a complete full-stack application from scratch using React for the frontend and Node.js with Express for the backend.',
    category: 'projects',
    author: mockUsers[1],
    createdAt: '2025-05-09T14:30:00Z',
    likes: 28,
    bookmarked: true
  },
  {
    id: 'post3',
    title: 'Need Help: TypeScript Interface vs Type Alias',
    content: 'Full detailed content of the post goes here...',
    excerpt: "I'm struggling to understand when to use TypeScript interfaces versus type aliases. Can someone explain the main differences and best use cases for each?",
    category: 'bug-help',
    author: mockUsers[0],
    createdAt: '2025-05-08T09:15:00Z',
    likes: 7,
    bookmarked: false
  },
  {
    id: 'post4',
    title: 'Tech Meetup: AI in Healthcare - Next Friday',
    content: 'Full detailed content of the post goes here...',
    excerpt: 'Join us for an exciting discussion on the applications of artificial intelligence in healthcare. Expert speakers, networking opportunities, and more.',
    category: 'events',
    author: mockUsers[2],
    createdAt: '2025-05-07T16:45:00Z',
    likes: 19,
    bookmarked: false
  },
  {
    id: 'post5',
    title: 'Remote Data Science Internship Available',
    content: 'Full detailed content of the post goes here...',
    excerpt: 'Our company is looking for data science interns who can work remotely. Perfect opportunity to gain practical experience with real-world datasets.',
    category: 'internships',
    author: mockUsers[3],
    createdAt: '2025-05-06T11:20:00Z',
    likes: 36,
    bookmarked: true
  },
  {
    id: 'post6',
    title: 'Portfolio Project: Building a Mobile App with React Native',
    content: 'Full detailed content of the post goes here...',
    excerpt: 'Sharing my experience creating a cross-platform mobile application using React Native. Includes code samples and best practices.',
    category: 'projects',
    author: mockUsers[0],
    createdAt: '2025-05-05T13:10:00Z',
    likes: 31,
    bookmarked: false
  }
];
