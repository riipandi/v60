# syntax=docker/dockerfile:1.7

# Args value for build
ARG NODE_VERSION=20

# -----------------------------------------------------------------------------
# This is base image with `pnpm` package manager
# -----------------------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS builder
ENV PNPM_HOME="/pnpm" PATH="$PNPM_HOME:$PATH"
ENV ELEVENTY_PRODUCTION=true

WORKDIR /srv

RUN apk update && apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest-9 --activate

COPY --chown=node:node . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile \
	--ignore-scripts && NODE_ENV=production pnpm build

# ------------------------------------------------------------------------------
# Use the slim image for a lean production container
# ------------------------------------------------------------------------------
FROM ghcr.io/static-web-server/static-web-server:2-alpine as runner
LABEL org.opencontainers.image.source="https://github.com/riipandi/v60-eleventy"
WORKDIR /public

# Copy required application packages from builder step.
COPY --from=builder /srv/_site /public

ARG SERVER_PORT=80 \
	SERVER_HOST=0.0.0.0 \
	SERVER_LOG_LEVEL=info \
	SERVER_LOG_REMOTE_ADDRESS=true \
	SERVER_CORS_ALLOW_ORIGINS="*"

ENV SERVER_PORT=$SERVER_PORT \
	SERVER_HOST=$SERVER_HOST \
	SERVER_LOG_LEVEL=$SERVER_LOG_LEVEL \
	SERVER_LOG_REMOTE_ADDRESS=$SERVER_LOG_REMOTE_ADDRESS \
	SERVER_CORS_ALLOW_ORIGINS=$SERVER_CORS_ALLOW_ORIGINS

ENV SERVER_ROOT=/public SERVER_HEALTH=true

EXPOSE 80
