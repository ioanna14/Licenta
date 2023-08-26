# Use the desired base image
FROM node:16.20-alpine3.17

# Set the working directory
WORKDIR /app

COPY ./ ./

# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "run", "dev"]
