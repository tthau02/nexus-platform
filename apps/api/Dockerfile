FROM node:20-alpine AS base
RUN npm i -g pnpm

FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN turbo prune api --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build --filter=api...

FROM base AS runner
WORKDIR /app
COPY --from=installer /app/ .
CMD pnpm start:prod --filter api
