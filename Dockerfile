FROM node:18-alpine3.18
WORKDIR /usr/src/barber-shop-api
COPY package.json .
RUN npm install --omit=dev
COPY ./dist ./dist
COPY ./prisma ./prisma
COPY ./prisma-file-union.ts ./prisma-file-union.ts
ENV DATABASE_URL="postgresql://docker:docker@localhost:5432/polls?schema=public"
ENV PRIVATE_KEY="sAnd#0704"
ENV PORT=3333
EXPOSE 3333
CMD npm start