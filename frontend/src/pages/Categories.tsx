
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Category } from '../components/CategoryTabs';
import PostCard from '../components/PostCard';
import { mockPosts } from '../mockData';
import { Button } from '@/components/ui/button';

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const categories: Category[] = ['internships', 'projects', 'bug-help', 'events'];
  
  const getCategoryDisplayName = (category: Category): string => {
    switch(category) {
      case 'internships': return 'Internships';
      case 'projects': return 'Projects';
      case 'bug-help': return 'Bug Help';
      case 'events': return 'Events';
      default: return 'All';
    }
  };

  const getCategoryColor = (category: Category): string => {
    switch(category) {
      case 'internships': return 'bg-blue-600';
      case 'projects': return 'bg-green-600';
      case 'bug-help': return 'bg-red-600';
      case 'events': return 'bg-purple-600';
      default: return 'bg-primary';
    }
  };
  
  const filteredPosts = activeCategory === 'all' 
    ? mockPosts 
    : mockPosts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <div className="blog-container py-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Categories</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse posts by category to find exactly what you're looking for
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {categories.map(category => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`h-auto py-6 flex flex-col items-center justify-center ${
                  activeCategory === category ? getCategoryColor(category) : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                <span className="text-lg font-medium">{getCategoryDisplayName(category)}</span>
                <span className="text-sm mt-1">
                  {mockPosts.filter(post => post.category === category).length} posts
                </span>
              </Button>
            ))}
          </div>
          
          <h2 className="text-2xl font-semibold mb-6">
            {activeCategory === 'all' ? 'All Posts' : `${getCategoryDisplayName(activeCategory)} Posts`}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <div key={post.id} className="h-full">
                <PostCard post={post} />
              </div>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">No posts found in this category.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
