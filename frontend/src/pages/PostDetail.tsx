
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { mockPosts } from '../mockData';
import { ThumbsUp, Bookmark, ArrowLeft } from 'lucide-react';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const post = mockPosts.find(p => p.id === id);
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow blog-container py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The post you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <div className="blog-container py-8">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Posts
              </Link>
            </Button>
            
            <span className={`category-badge ${categoryClasses[post.category]}`}>
              {getCategoryLabel(post.category)}
            </span>
            
            <h1 className="text-3xl font-bold mt-4 mb-2">{post.title}</h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-2">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.author.name}</div>
                  <div className="text-sm text-gray-500">{formatDate(post.createdAt)}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="prose max-w-none mb-8">
            <p className="text-gray-800 leading-relaxed">
              {/* In a real app, this would be rich HTML content rendered safely */}
              {post.content || post.excerpt}
              
              {/* Placeholder content for demo */}
              <br /><br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.
              <br /><br />
              Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor.
            </p>
          </div>
          
          <div className="flex items-center justify-between border-t border-b py-4 mb-8">
            <div className="flex items-center space-x-1">
              <Button variant="ghost" className="flex items-center space-x-2">
                <ThumbsUp className="h-5 w-5" />
                <span>{post.likes} likes</span>
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              className={post.bookmarked ? "text-blog-primary" : ""}
            >
              <Bookmark className="h-5 w-5 mr-2" />
              {post.bookmarked ? "Saved" : "Save"}
            </Button>
          </div>
          
          <div className="comments mb-8">
            <h2 className="text-xl font-bold mb-4">Comments</h2>
            
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-gray-600">
                Comments section will be implemented in the next version.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PostDetail;
