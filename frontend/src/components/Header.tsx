
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          BlogApp
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
            Home
          </Link>
          {user && (
            <Link to="/new-post" className="text-gray-600 hover:text-gray-900 transition-colors">
              New Post
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{user.name || user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border shadow-lg">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full cursor-pointer">
                    Edit Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/new-post" className="w-full cursor-pointer">
                    New Post
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
