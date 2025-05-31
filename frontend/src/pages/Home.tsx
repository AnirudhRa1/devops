import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CategoryTabs, { Category } from '../components/CategoryTabs';
import PostCard from '../components/PostCard';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Filter } from 'lucide-react';
import { fetchAllBlogs, fetchBlogsByCategory } from '@/services/blogService';

type FilterOption = 'recent' | 'oldest' | 'mostLiked';

type Blog = {
  _id: string;
  title: string;
  content: string;
  category: string;
  author: { email: string } | null;
  createdAt: string;
  // Add more fields as needed
};

const Home = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [filterOption, setFilterOption] = useState<FilterOption>('recent');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    if (activeCategory === 'all') {
      fetchAllBlogs()
        .then(data => {
          setBlogs(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      fetchBlogsByCategory(activeCategory)
        .then(data => {
          setBlogs(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [activeCategory]);

  // Filter blogs by category first
  let filteredBlogs = activeCategory === 'all' 
    ? [...blogs] 
    : [...blogs.filter(blog => blog.category === activeCategory)];

  // Then apply sorting based on filter option
  filteredBlogs = filteredBlogs.sort((a, b) => {
    switch (filterOption) {
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <div className="blog-container py-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to BlogApp</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover opportunities, projects, get help, and stay updated with all the latest events.
            </p>
          </div>
          <div className="flex justify-between items-center mb-6">
            <CategoryTabs 
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-2">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className={filterOption === 'recent' ? 'bg-muted' : ''}
                  onClick={() => setFilterOption('recent')}
                >
                  Most recent
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={filterOption === 'oldest' ? 'bg-muted' : ''}
                  onClick={() => setFilterOption('oldest')}
                >
                  Oldest first
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {loading ? (
            <div className="text-center py-16">
              <p className="text-gray-500">Loading blogs...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-500">Error: {error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map(blog => (
                <div key={blog._id} className="h-full">
                  <PostCard post={{
                    id: blog._id,
                    title: blog.title,
                    content: blog.content,
                    excerpt: blog.content.slice(0, 100) + '...',
                    category: (['internships', 'projects', 'bug-help', 'events'].includes(blog.category) ? blog.category : 'projects') as 'internships' | 'projects' | 'bug-help' | 'events',
                    author: {
                      id: '',
                      name: blog.author?.email || 'Unknown',
                      avatar: '',
                      role: 'student',
                    },
                    createdAt: blog.createdAt,
                    likes: 0,
                    bookmarked: false,
                  }} />
                </div>
              ))}
            </div>
          )}
          {filteredBlogs.length === 0 && !loading && !error && (
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

export default Home;
