# syntax=docker.io/docker/dockerfile:1

FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json ./
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/backend/package.json ./apps/backend/
RUN npm ci --workspace=apps/frontend --workspace=apps/backend

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

#region For Tuyau files generation
ARG NODE_ENV
ARG PORT
ARG APP_KEY
ARG HOST
ARG LOG_LEVEL
ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_DATABASE

ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}
ENV APP_KEY=${APP_KEY}
ENV HOST=${HOST}
ENV LOG_LEVEL=${LOG_LEVEL}
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_USER=${DB_USER}
ENV DB_DATABASE=${DB_DATABASE}
#endregion

COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY apps/backend ./apps/backend
COPY apps/frontend ./apps/frontend

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app/apps/backend

RUN node ace tuyau:generate

WORKDIR /app

RUN npm run build --workspace=apps/frontend

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/frontend/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/standalone/apps/frontend ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/standalone/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
