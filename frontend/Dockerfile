# Use latest even number version
FROM node:24-alpine

WORKDIR /pantryapp

# Copies package.json and package-lock.json into WORKDIR, from the directory this Dockerfile is inside of
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app code to WORKDIR
COPY . .

EXPOSE 5100

CMD [ "npm", "run", "dev" ]