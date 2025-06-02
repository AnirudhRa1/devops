# DevOps Blog Application
## Overview
This is a full-stack blog application with a focus on DevOps practices. The application allows users to create, read, and filter blog posts by categories. It features user authentication, responsive design, and is fully containerized for easy deployment.

## Features
- User authentication (signup/login)
- Create and view blog posts
- Filter posts by categories (internships, projects, bug-help, events)
- Sort posts by recency
- Responsive design for mobile and desktop
- Prometheus metrics for monitoring
## Tech Stack
### Backend
- Node.js with Express
- MongoDB (Mongoose ODM)
- JWT Authentication
- Prometheus monitoring
- Docker containerization
### Frontend
- React with TypeScript
- Vite build tool
- TailwindCSS with Shadcn UI components
- React Router for navigation
- React Query for data fetching
### DevOps
- GitHub Actions for CI/CD
- Docker for containerization
- SonarCloud for code quality
- Google Cloud Run for backend deployment
- Vercel for frontend deployment
## Getting Started
### Prerequisites
- Node.js (v18 or later)
- Docker and Docker Compose (optional, for containerized development)
- MongoDB connection string
### Environment Variables
Create a .env file in the backend directory with the following variables:

### Installation and Setup Backend Frontend
### Docker Setup Backend Frontend Using Docker Compose for Prometheus
This will start Prometheus on port 9090 for monitoring the application.

## API Endpoints
### Authentication
- POST /api/auth/signup - Register a new user
- POST /api/auth/signin - Login a user
### Blog Posts
- GET /api/blogs - Get all blog posts
- POST /api/blogs - Create a new blog post (requires authentication)
- GET /api/blogs/:id - Get a specific blog post
- GET /api/blogs/category/:category - Get blog posts by category
## Deployment
The application is currently deployed at:

- Backend: https://backend-service-95433363736.us-central1.run.app/
- Frontend: https://devops-steel-psi.vercel.app
## CI/CD Pipeline
The project uses GitHub Actions for continuous integration. The workflow includes:

- Checking out the code
- Setting up Node.js
- Installing dependencies
- Building the frontend
To deploy changes:

1. Push to the main branch or create a pull request
2. GitHub Actions will automatically run the CI pipeline
3. After successful CI, manual deployment can be triggered
## Monitoring
The application includes Prometheus metrics at the /metrics endpoint for monitoring performance and health.

## Contributing
1. Fork the repository
2. Create a feature branch ( git checkout -b feature/amazing-feature )
3. Commit your changes ( git commit -m 'Add some amazing feature' )
4. Push to the branch ( git push origin feature/amazing-feature )
5. Open a Pull Request
## License
This project is licensed under the ISC License - see the package.json file for details.