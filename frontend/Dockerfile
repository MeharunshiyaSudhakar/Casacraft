FROM node:22-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source
COPY . .

# Build the application
RUN npm run build

# Use a lean Node.js image to serve the application
FROM node:22-alpine

WORKDIR /app

# Install 'serve' package globally to serve static content
RUN npm install -g serve

# Copy built assets from the previous stage
COPY --from=build /app/dist ./dist

# Expose port 3000 as requested
EXPOSE 3001

# Start serving the application on port 3000
CMD ["serve", "-s", "dist", "-l", "3001"]
