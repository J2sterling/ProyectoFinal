# Stage 1: Build the application
FROM node:16-alpine AS builder
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm install  # Cambiado de npm ci a npm install

# Then copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production image with minimal footprint
FROM node:16-alpine
WORKDIR /app

# Only copy built assets
COPY --from=builder /app/build ./build

# Install serve globally to serve static files
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
