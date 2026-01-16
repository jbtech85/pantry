# Use latest even number version
FROM node:24-alpine

WORKDIR /api

# Copies package.json and package-lock.json into WORKDIR, from the directory this Dockerfile is inside of
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app code to WORKDIR
COPY . .

CMD [ "npm", "run", "dev" ]