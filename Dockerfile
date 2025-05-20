# syntax=docker/dockerfile:1
ARG APP_ENV
ARG NEXT_PUBLIC_BASEURL
ARG API_LOGIN_KEY
FROM node:22-bookworm AS base

ARG APP_ENV
ARG NEXT_PUBLIC_BASEURL
ARG API_LOGIN_KEY
ENV API_LOGIN_KEY=$API_LOGIN_KEY
ENV NEXT_PUBLIC_BASEURL=$NEXT_PUBLIC_BASEURL
ENV APP_ENV=$APP_ENV
ENV NEXT_TELEMETRY_DISABLED=1

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# RUN --mount=type=cache,target=/root/.pnpm-store \
#   corepack enable pnpm && pnpm i --frozen-lockfile
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN --mount=type=cache,target=/app/.next/cache \
    yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD node server.js
