FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY next.config.mjs ./next.config.mjs
COPY tsconfig.json ./tsconfig.json

COPY src ./src
COPY public ./public
COPY styles ./styles
COPY .env.production ./.env.production

RUN npm run build