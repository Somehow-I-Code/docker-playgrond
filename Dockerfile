FROM node:20.11.1-alpine3.19
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install --no-optional && npm cache clean --force
EXPOSE 8888