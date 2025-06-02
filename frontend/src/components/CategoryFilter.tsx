
import React from 'react';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'All Posts' },
  { id: 'projects', name: 'Projects' },
  { id: 'internships', name: 'Internships' },
  { id: 'bug help', name: 'Bug Help' },
  { id: 'events', name: 'Events' },
];

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className={selectedCategory === category.id 
            ? 'bg-red-600 hover:bg-red-700 text-white' 
            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
