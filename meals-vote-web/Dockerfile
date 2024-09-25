FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN rm -rf ./src
EXPOSE 3000
CMD [ "npm", "run", "dev" ]