import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  author?: {
    name: string;
    email: string;
  };
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${post.id}`);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'projects':
        return 'bg-green-100 text-green-800';
      case 'bug help':
        return 'bg-red-100 text-red-800';
      case 'internships':
        return 'bg-blue-100 text-blue-800';
      case 'events':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Card 
      className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge className={getCategoryColor(post.category)}>
            {post.category}
          </Badge>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {post.content.length > 150 
            ? `${post.content.substring(0, 150)}...`
            : post.content
          }
        </p>
      </CardContent>
      
      <CardFooter className="px-6 py-4 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
            {post.author?.name?.charAt(0) || post.author?.email?.charAt(0) || 'U'}
          </div>
          <span className="text-sm text-gray-600">
            {post.author?.name || post.author?.email || 'Anonymous'}
          </span>
        </div>
        
        <span className="text-sm text-gray-500">
          {formatDate(post.createdAt)}
        </span>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
