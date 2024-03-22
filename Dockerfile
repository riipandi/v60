# syntax=docker/dockerfile:1.4

# Args value for build
ARG NODE_VERSION=20

# -----------------------------------------------------------------------------
# This is base image with `pnpm` package manager
# -----------------------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV ELEVENTY_PRODUCTION=true

RUN apk update && apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest-8 --activate

COPY --chown=node:node . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm build

# ------------------------------------------------------------------------------
# Use the slim image for a lean production container
# ------------------------------------------------------------------------------
FROM ghcr.io/static-web-server/static-web-server:2-alpine as runner
LABEL org.opencontainers.image.source="https://github.com/riipandi/v60-eleventy"
WORKDIR /public

# Copy required application packages from builder step.
COPY --from=builder /app/_site /public

ENV SERVER_PORT 80
ENV SERVER_HOST 0.0.0.0
ENV SERVER_ROOT /public
ENV SERVER_LOG_LEVEL info
ENV SERVER_LOG_REMOTE_ADDRESS true
ENV SERVER_CORS_ALLOW_ORIGINS "*"
ENV SERVER_HEALTH true

EXPOSE 80
