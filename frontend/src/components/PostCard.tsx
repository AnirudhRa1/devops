
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Post } from '../types';
import { Bookmark, ThumbsUp } from "lucide-react";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const categoryClasses = {
    'internships': 'category-badge-internships',
    'projects': 'category-badge-projects',
    'bug-help': 'category-badge-bug-help',
    'events': 'category-badge-events'
  };
  
  const getCategoryLabel = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="post-card h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <span className={`category-badge ${categoryClasses[post.category]}`}>
              {getCategoryLabel(post.category)}
            </span>
          </div>
        </div>
        <Link to={`/posts/${post.id}`} className="mt-2 group">
          <h3 className="text-lg font-semibold group-hover:text-blog-primary transition-colors">
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-gray-600 text-sm line-clamp-3">
          {post.excerpt}
        </p>
      </CardContent>
      
      <CardFooter className="pt-4 flex flex-col space-y-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>
                {post.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-600">
              {post.author.name}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {formatDate(post.createdAt)}
          </span>
        </div>
        
        <div className="flex justify-between w-full">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blog-primary">
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span className="text-xs">{post.likes}</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={post.bookmarked 
              ? "text-blog-primary" 
              : "text-gray-500 hover:text-blog-primary"}
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
