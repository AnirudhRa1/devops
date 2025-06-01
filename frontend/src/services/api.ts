import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

interface ApiOptions {
  method?: string;
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export const api = {
  async call(endpoint: string, options: ApiOptions = {}) {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  },

  // Auth endpoints
  auth: {
    async login(email: string, password: string) {
      return api.call(API_ENDPOINTS.auth.login, {
        method: 'POST',
        body: { email, password },
      });
    },
    async register(email: string, password: string) {
      return api.call(API_ENDPOINTS.auth.register, {
        method: 'POST',
        body: { email, password },
      });
    },
  },

  // Blog endpoints
  blogs: {
    async getAll() {
      return api.call(API_ENDPOINTS.posts.list);
    },
    async getById(id: string) {
      return api.call(API_ENDPOINTS.posts.getById(id));
    },
    async create(data: { title: string; content: string; category?: string }) {
      return api.call(API_ENDPOINTS.posts.create, {
        method: 'POST',
        body: data,
      });
    },
    async update(id: string, data: { title?: string; content?: string; category?: string }) {
      return api.call(API_ENDPOINTS.posts.update(id), {
        method: 'PUT',
        body: data,
      });
    },
    async delete(id: string) {
      return api.call(API_ENDPOINTS.posts.delete(id), {
        method: 'DELETE',
      });
    },
  },
};
