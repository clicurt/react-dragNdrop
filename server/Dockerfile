# Specifies where to get the base image (Node v12 in our case) and creates a new container for it
FROM node:12

# Set working directory. Paths will be relative this WORKDIR.
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files from host computer to the container
COPY . .

COPY docker-entrypoint.sh /usr/local/bin/

# Build the app
RUN npm run start

# Specify port app runs on
EXPOSE 4000

# Run the app
# CMD [ "npm", "start" ]
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]