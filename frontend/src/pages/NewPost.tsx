
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const API_BASE_URL = 'https://backend-service-95433363736.us-central1.run.app';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content: `${excerpt}\n\n${content}`,
          category,
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Blog post created successfully!",
        });
        navigate('/');
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create New Post</CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a descriptive title"
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="excerpt">Short Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A brief summary of your post"
                  className="mt-1 min-h-[80px]"
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="projects">Projects</SelectItem>
                    <SelectItem value="internships">Internships</SelectItem>
                    <SelectItem value="bug help">Bug Help</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content here..."
                  required
                  className="mt-1 min-h-[300px]"
                />
              </div>
              
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-red-600 hover:bg-red-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create Post'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NewPost;
