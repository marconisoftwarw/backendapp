FROM node:latest
WORKDIR /usr/app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 3001
RUN npm run start:dev
