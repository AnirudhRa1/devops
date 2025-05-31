
export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: 'internships' | 'projects' | 'bug-help' | 'events';
  author: User;
  createdAt: string;
  likes: number;
  bookmarked: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  role: 'student' | 'teacher' | 'moderator' | 'admin';
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  parentId?: string;
}
