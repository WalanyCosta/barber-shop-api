FROM node:18-alpine3.18
WORKDIR /usr/src/barber-shop-api
COPY package.json .
RUN npm install --omit=dev
ENV DATABASE_URL="postgresql://docker:docker@postgres:5432/barber-shop?schema=public"
ENV PRIVATE_KEY="sAnd#0704"
ENV PORT=3333
EXPOSE 3333
