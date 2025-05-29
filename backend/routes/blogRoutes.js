import express from 'express';
import Blog from '../models/Blog.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

// POST: Create blog (protected)
router.post('/', authenticate, async (req, res) => {
  try {
    const blog = new Blog({ ...req.body, author: req.user.id });
    await blog.save();
    res.json(blog);
  } catch (err) {
    // Avoid leaking internal error details in production
    res.status(500).json({ message: 'Blog creation failed' });
  }
});

// GET: All blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'email');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});

// GET: One blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'email');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: 'Invalid blog ID' });
  }
});

// GET: Blogs by category
router.get('/category/:category', async (req, res) => {
  try {
    const blogs = await Blog.find({ category: req.params.category }).populate('author', 'email');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs by category' });
  }
});

export default router;
