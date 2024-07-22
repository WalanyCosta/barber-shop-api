FROM node:20.15-alpine3.19

WORKDIR /usr/src/barber-shop-api

COPY package.json .

RUN npm install --omit=dev

ENV DATABASE_URL="postgresql://docker:docker@postgres:5432/barber-shop?scheme=public"
ENV PRIVATE_KEY="sAnd#0704"
ENV PORT=3333

COPY prisma/ .

COPY dist/ .

EXPOSE 3333
