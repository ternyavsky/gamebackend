# Base image
FROM node:lts 

RUN npm i -g pnpm


WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


CMD [ "node", "dist/main.js" ]

