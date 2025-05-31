
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Category type definition
export type Category = 'all' | 'internships' | 'projects' | 'bug-help' | 'events';

interface CategoryTabsProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ 
  activeCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="mb-8">
      <Tabs 
        defaultValue={activeCategory} 
        onValueChange={(value) => onCategoryChange(value as Category)}
        className="w-full"
      >
        <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            All Posts
          </TabsTrigger>
          <TabsTrigger value="internships" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Internships
          </TabsTrigger>
          <TabsTrigger value="projects" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Projects
          </TabsTrigger>
          <TabsTrigger value="bug-help" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            Bug Help
          </TabsTrigger>
          <TabsTrigger value="events" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Events
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CategoryTabs;
