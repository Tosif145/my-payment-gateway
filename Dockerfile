# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY app.js ./
COPY config/ ./config
COPY controllers/ ./controllers
COPY middlewares/ ./middlewares
COPY models/ ./models
COPY routes/ ./routes
COPY services/ ./services
COPY swagger/ ./swagger

# Copy environment files
COPY .env ./

# Expose the application port
EXPOSE 5000

# Command to run the application
CMD ["node", "app.js"]
