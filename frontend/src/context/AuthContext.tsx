import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/config/api';

interface AuthContextType {
  user: { token: string; email: string } | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ token: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Initial token check:', token ? 'Token exists' : 'No token');
    
    if (token) {
      try {
        // Set default axios header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // Get user info from token
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        console.log('Decoded token:', decodedToken);
        setUser({ token, email: decodedToken.email });
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login request...');
      const response = await axios.post(`${API_BASE_URL}api/auth/signin`, {
        email,
        password,
      });
      console.log('Login response:', response.data);
      
      const { token } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ token, email });
      console.log('User state updated:', { email });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      console.log('Attempting signup request...');
      const response = await axios.post(`${API_BASE_URL}api/auth/signup`, {
        email,
        password,
      });
      console.log('Signup response:', response.data);
      
      const { token } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ token, email });
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
