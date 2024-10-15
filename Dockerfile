# Use an official Node.js runtime as the base image with Node.js version 18.13.0
FROM node:18.13.0

# Set the working directory in the container
WORKDIR /app

# Copy all project files and directories to the container
COPY . .

# Install server-side dependencies
RUN npm install

# Navigate to the client directory
WORKDIR /app/client

# Install client-side dependencies
RUN npm install

# Build the React client
RUN npm run build

# Move back to the root directory
WORKDIR /app

# Set the NODE_ENV environment variable to 'production'
ENV NODE_ENV production

# Expose the port your Node.js application is running on (if applicable)
ENV PORT 80
EXPOSE $PORT

# Define the command to start your application
CMD ["node", "./src/index.js"]
