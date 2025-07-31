FROM node:20.12.2-alpine AS builder

RUN echo "https://mirrors.aliyun.com/alpine/v$(cut -d. -f1,2 /etc/alpine-release)/main/" | tee /etc/apk/repositories && \
    echo "https://mirrors.aliyun.com/alpine/v$(cut -d. -f1,2 /etc/alpine-release)/community/" | tee -a /etc/apk/repositories

RUN apk add --no-cache --virtual .build-deps \
    python3 make g++ git sqlite-dev libc6-compat

WORKDIR /usr/src
COPY . .

RUN corepack enable
RUN corepack prepare pnpm@10.13.1 --activate

RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM node:20.12.2-alpine

RUN apk add --no-cache \
    sqlite \
    libc6-compat

WORKDIR /usr/app
COPY --from=builder /usr/src/dist/output ./output
ENV HOST=0.0.0.0 PORT=4444 NODE_ENV=production
EXPOSE $PORT
CMD ["node", "output/server/index.mjs"]
