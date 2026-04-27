#### Stage 1 - dependencies
# Install dependencies separately for Docker layer caching

# Use latest even number version
ARG NODE_VERSION=24-alpine

# This layer only rebuilds when package.json changes, not on every source change
FROM node:${NODE_VERSION} AS deps

WORKDIR /api

# Copies package.json and package-lock.json into WORKDIR, from the directory this Dockerfile is inside of
COPY package*.json ./

# persist npm's download cache between builds
# use automated environment version (ci), skip dev dependencies for Prod
RUN --mount=type=cache,target=/root/.npm,sharing=locked \
    npm ci --omit=dev


#### Stage 2 - production
ARG NODE_VERSION=24-alpine
FROM node:${NODE_VERSION} AS production
WORKDIR /api

ENV NODE_ENV=production \
    NPM_CONFIG_LOGLEVEL=warn

COPY --from=deps --chown=node:node /api/node_modules ./node_modules

# Copy app code to WORKDIR
COPY --chown=node:node . .

# run as a non root user for better security
USER node

EXPOSE 4100

CMD ["node", "server.js"]