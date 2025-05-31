export async function fetchAllBlogs() {
  const response = await fetch('http://localhost:5000/api/blogs');
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return response.json();
}

export async function fetchBlogsByCategory(category: string) {
  const response = await fetch(`http://localhost:5000/api/blogs/category/${category}`);
  if (!response.ok) {
    throw new Error('Failed to fetch blogs by category');
  }
  return response.json();
} 