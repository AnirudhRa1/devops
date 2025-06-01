export const API_BASE_URL = 'https://backend-service-95433363736.us-central1.run.app/';

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  posts: {
    list: '/posts',
    create: '/posts',
    getById: (id: string) => `/posts/${id}`,
    update: (id: string) => `/posts/${id}`,
    delete: (id: string) => `/posts/${id}`,
  },
  users: {
    profile: '/users/profile',
    update: '/users/profile',
  },
}; 