# Stage 1 - Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (layer caching)
COPY /myapp/package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the source code
COPY /myapp/* .

# Expose the port
EXPOSE 3000

# Start the app	
CMD ["node", "server.js"]

