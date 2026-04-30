#### Stage 1 - dependencies
# Install dependencies separately for Docker layer caching

# Use latest even number version
ARG NODE_VERSION=24-alpine

# This layer only rebuilds when package.json changes, not on every source change
FROM node:${NODE_VERSION} AS deps

WORKDIR /client

# Copies package.json and package-lock.json into WORKDIR, from the directory this Dockerfile is inside of
COPY package*.json ./

# persist npm's download cache between builds
# use automated environment version (ci), keep dev depencies here as we don't run this in production
RUN --mount=type=cache,target=/root/.npm,sharing=locked \
    npm ci


#### Stage 2 - builder
# compiles ts and builds vite bundle
# This entire stage is discarded after - never ships to production
ARG NODE_VERSION=24-alpine
FROM node:${NODE_VERSION} AS builder
WORKDIR /client

# pull installed dependencies from deps stage
COPY --from=deps /client/node_modules ./node_modules

# Copy app code to WORKDIR
COPY . .

RUN npm run build


#### Stage 3 - development  
FROM deps AS development
WORKDIR /client
COPY . .
EXPOSE 5100
CMD ["npm", "run", "dev"]

#### Stage 4 - production
# minimal nginx image; no Node / source code / dependenices
# nginx starts as root to bind port 80, drops to nginx user for worker processes automatically
FROM nginx:alpine AS production

COPY nginx/start.sh /docker-entrypoint.d/start.sh
RUN chmod +x /docker-entrypoint.d/start.sh

# copy nginx config template
# start.sh will process this with envsubst at container startup
COPY nginx/nginx.conf.template /etc/nginx/templates/nginx.conf.template

# Copy only the built static files from builder stage
# This is the only thing from Node that makes it into the final image
COPY --from=builder /client/dist /usr/share/nginx/html

EXPOSE 80