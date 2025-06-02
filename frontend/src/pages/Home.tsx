
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import BlogCard from '../components/BlogCard';
import CategoryFilter from '../components/CategoryFilter';
import { useToast } from '@/hooks/use-toast';

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

const API_BASE_URL = 'https://backend-service-95433363736.us-central1.run.app';

const Home = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => 
        post.category.toLowerCase() === selectedCategory.toLowerCase()
      ));
    }
  }, [posts, selectedCategory]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        throw new Error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to load blog posts. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to BlogApp
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover opportunities, projects, get help, and stay updated with all the latest events.
          </p>
        </div>

        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              {selectedCategory === 'all' 
                ? 'No blog posts found. Be the first to create one!' 
                : `No posts found in the ${selectedCategory} category.`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
