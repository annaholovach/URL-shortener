FROM node:16.19.0-alpine as base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

CMD [ "npm", "run", "dev" ]