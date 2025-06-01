FROM node:18-alpine
# or python:3.9-slim for Python, etc.

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]