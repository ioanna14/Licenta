FROM node:16.20-alpine3.17

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./package*.json ./

COPY ./tsconfig*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend files
COPY ./src/ ./

# Expose the port the app runs on
EXPOSE 3002

# Define the command to run your app
CMD ["npm", "run", "start"]