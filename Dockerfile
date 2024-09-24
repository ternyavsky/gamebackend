# Base image
FROM node:lts 



WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app
RUN npm run build


CMD [ "node", "dist/main.js" ]

