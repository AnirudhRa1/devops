export const API_BASE_URL = 'https://backend-service-95433363736.us-central1.run.app/';

export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/signin',
    register: '/api/auth/signup',
  },
  posts: {
    list: '/api/blogs',
    create: '/api/blogs',
    getById: (id: string) => `/api/blogs/${id}`,
    update: (id: string) => `/api/blogs/${id}`,
    delete: (id: string) => `/api/blogs/${id}`,
  },
  users: {
    profile: '/users/profile',
    update: '/users/profile',
  },
}; 