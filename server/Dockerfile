# Use an official Node.js runtime as the base image with Node.js version 18.13.0
FROM node:18.13.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json if available first to take advantage of Docker cache for 'npm install'
COPY package.json .

# Install dependencies
RUN npm install

# Copy the remaining project files (including ./src) to the container
COPY . .

# Set the NODE_ENV environment variable to 'production'
ENV NODE_ENV production

# Expose the port your Node.js application is running on
ENV PORT 5001
EXPOSE $PORT

# Define the command to start your application
CMD ["node", "./index.js"]
