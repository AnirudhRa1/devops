
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

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

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // For now, we'll simulate fetching a blog post
    // You can replace this with your actual API call later
    const mockPost: BlogPost = {
      id: id || '1',
      title: 'Sample Blog Post Title',
      content: 'This is a detailed view of the blog post content. Here you can read the full article with all the details, formatting, and complete information that the author wanted to share.',
      category: 'Projects',
      createdAt: new Date().toISOString(),
      author: {
        name: 'John Doe',
        email: 'john@example.com'
      }
    };

    // Simulate loading delay
    setTimeout(() => {
      setPost(mockPost);
      setIsLoading(false);
    }, 500);
  }, [id]);

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
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-8 w-3/4"></div>
            <div className="space-y-4">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
            <Link to="/">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <article className="bg-white rounded-lg shadow-lg border overflow-hidden">
          <div className="p-8 lg:p-12">
            <div className="flex items-center justify-between mb-8">
              <Badge className={`${getCategoryColor(post.category)} text-sm px-4 py-2`}>
                {post.category}
              </Badge>
              <span className="text-sm text-gray-500 font-medium">
                {formatDate(post.createdAt)}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center space-x-4 mb-10 pb-8 border-b border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {post.author?.name?.charAt(0) || post.author?.email?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {post.author?.name || post.author?.email || 'Anonymous'}
                </p>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            </div>

            <div className="prose prose-xl max-w-none">
              <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                {post.content}
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogDetail;
