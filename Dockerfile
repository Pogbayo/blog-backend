# Use official Node.js image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Start the app
CMD ["npm", "run", "dev"]
