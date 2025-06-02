
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (name: string) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const API_BASE_URL = 'https://backend-service-95433363736.us-central1.run.app';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        // Simple JWT decode (assumes payload is base64 encoded)
        const payload = JSON.parse(atob(storedToken.split('.')[1]));
        if (payload.exp * 1000 > Date.now()) {
          setToken(storedToken);
          setUser({ id: payload.id, name: payload.name || '', email: payload.email || '' });
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token: newToken } = data;
        
        localStorage.setItem('token', newToken);
        setToken(newToken);
        
        // Decode user info from token
        const payload = JSON.parse(atob(newToken.split('.')[1]));
        setUser({ id: payload.id, name: payload.name || '', email: payload.email || email });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token: newToken } = data;
        
        localStorage.setItem('token', newToken);
        setToken(newToken);
        
        const payload = JSON.parse(atob(newToken.split('.')[1]));
        setUser({ id: payload.id, name: name, email: email });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const updateProfile = async (name: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        setUser(prev => prev ? { ...prev, name } : null);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
  };

  const deleteAccount = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        logout();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Delete account error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        signup,
        logout,
        updateProfile,
        deleteAccount,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
