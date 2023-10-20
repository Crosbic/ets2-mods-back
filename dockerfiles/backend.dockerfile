FROM node:alpine

WORKDIR /usr/backend

RUN chmod -R 755 ./

COPY ./package*.json ./

RUN npm i

COPY ./ ./
COPY ./dist ./
COPY ./src ./

EXPOSE 80

CMD npm run start:dev
