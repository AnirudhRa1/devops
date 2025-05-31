import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import blogRoutes from './routes/blogRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB URI
const MONGO_URI = 'mongodb+srv://anirudhanirudh982:i5bLufCTgYE77UB3@cluster0.j2govnr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8081',
  credentials: true
}));

// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);

// Root test route
app.get('/', (req, res) => {
  res.send('🌐 Blog API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
