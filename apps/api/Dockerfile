# Install dependencies separately for Docker layer caching

#### Stage 1 - dependencies (development)
ARG NODE_VERSION=24-alpine
FROM node:${NODE_VERSION} AS deps-dev
WORKDIR /api
RUN corepack enable && corepack prepare pnpm@11.1.1 --activate
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store,sharing=locked \
    pnpm install --frozen-lockfile


### Stage 2 - development   
FROM deps-dev AS development
WORKDIR /api
COPY . .
EXPOSE 4100
CMD ["pnpm", "run", "dev"]


#### Stage 3 - dependencies (production)
# Use latest even number version
ARG NODE_VERSION=24-alpine
# This layer only rebuilds when package.json changes, not on every source change
FROM node:${NODE_VERSION} AS deps
WORKDIR /api
RUN corepack enable && corepack prepare pnpm@11.1.1 --activate
# Copies package.json and pnpm-lock.yaml into WORKDIR, from the directory this Dockerfile is inside of
COPY package.json pnpm-lock.yaml ./
# persist pnpm's download cache between builds
# use automated environment version (ci), skip dev dependencies for Prod
RUN --mount=type=cache,target=/root/.local/share/pnpm/store,sharing=locked \
    pnpm install --frozen-lockfile --prod


#### Stage 4 - production
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