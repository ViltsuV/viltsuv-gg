FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Development

  FROM base as dev-root
  COPY package.json pnpm-lock.yaml pnpm-workspace.yaml /app/
  WORKDIR /app
  RUN pnpm i

  FROM dev-root as dev-packages
  WORKDIR /app
  COPY ./packages/frontend/package.json ./packages/frontend/
  COPY ./packages/backend/package.json ./packages/backend/
  COPY ./packages/shared/package.json ./packages/shared/
  COPY ./packages/types/package.json ./packages/types/
  COPY ./packages/utils/package.json ./packages/utils/
  RUN pnpm run setup

  FROM dev-packages as dev-frontend
  WORKDIR /app/packages/frontend
  ENV NODE_ENV=development
  CMD ["pnpm", "run", "dev"]

  FROM dev-packages as dev-backend
  WORKDIR /app/packages/backend
  ENV NODE_ENV=development
  CMD ["pnpm", "run", "dev"]

# Production

  FROM base as backend-build
  WORKDIR /app
  COPY . .
  RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
  RUN pnpm run --filter=backend build
  RUN rm -rf /packages/frontend
  RUN rm -rf /packages/types

  FROM base as frontend-build
  WORKDIR /app
  COPY . .
  RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
  RUN pnpm run --filter=frontend build

  FROM base AS prod-backend-fastify
  COPY --from=backend-build /app /app
  EXPOSE 4000
  WORKDIR /app/packages/backend
  CMD [ "pnpm", "start:prod" ]

  FROM base AS prod-frontend-sveltekit
  COPY --from=frontend-build /app /app
  WORKDIR /app/packages/frontend
  EXPOSE 3000
  CMD [ "node", "build" ]

# todo:
# - switch to non-root user
# - minimize resulting container size (even more than now, if possible)