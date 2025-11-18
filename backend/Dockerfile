# Use latest even number version
FROM node:24-alpine

WORKDIR /app

# Copies package.json and package-lock.json into WORKDIR, from the directory this Dockerfile is inside of
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app code to WORKDIR
COPY . .

EXPOSE 4100

CMD [ "npm", "run", "dev" ]