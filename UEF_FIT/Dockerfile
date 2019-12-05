FROM node:8-alpine

WORKDIR /user/src/blockchain-app

COPY package*.json ./

RUN apk add python git make gcc g++

RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm", "start"]