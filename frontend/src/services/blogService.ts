import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

export async function fetchAllBlogs() {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.posts.list}`);
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return response.json();
}

export async function fetchBlogsByCategory(category: string) {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.posts.list}/category/${category}`);
  if (!response.ok) {
    throw new Error('Failed to fetch blogs by category');
  }
  return response.json();
}