# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js app for production
RUN npm run build

# Stage 2: Run the application in a lightweight production environment
FROM node:18-alpine

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_PUBLIC_APP_ENV=production

# Set working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Expose the port Next.js will run on
EXPOSE 3000

# Start the Next.js application in production mode
CMD ["npm", "start"]
