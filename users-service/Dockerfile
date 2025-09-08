FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --silent
COPY . .
EXPOSE 4001
CMD ["node", "server.js"]
