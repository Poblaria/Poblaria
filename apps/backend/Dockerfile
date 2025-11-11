FROM node:22-alpine AS base

# All deps stage
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/backend/package.json ./apps/backend/
RUN npm ci --workspace=apps/backend

# Production only deps stage
FROM base AS production-deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/backend/package.json ./apps/backend/
RUN npm ci --omit=dev --workspace=apps/backend

# Build stage
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY package.json package-lock.json ./
COPY apps/backend ./apps/backend
RUN npm run build --workspace=apps/backend

# Production stage
FROM base
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/apps/backend/build /app
COPY apps/backend/scripts/entrypoint.sh ./
EXPOSE 8080
ENTRYPOINT ["./entrypoint.sh"]
