# Use the desired base image
FROM node:16.20-alpine3.17

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./package*.json ./


# Install dependencies
RUN npm install

# Copy the rest of the frontend files
COPY ./ ./

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "run", "dev"]
