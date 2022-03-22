FROM node:16.14-alpine

LABEL maintainer="e3duardo@gmail.com"

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --silent

COPY . ./

CMD yarn start
