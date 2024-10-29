# Use an official Node.js runtime as the base image with Node.js version 20.10.0
FROM node:20.10.0

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json if available first to take advantage of Docker cache for 'npm install'
COPY package*.json ./

# Install dependencies only once during build
RUN export UV_THREADPOOL_SIZE=4
RUN npm install --legacy-peer-deps

# Copy the remaining project files (including src) to the container
COPY . .

# Build and run the application in development mode
CMD ["npm", "run", "start"]