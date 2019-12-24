FROM node:10

#setting working directory
WORKDIR /usr/src/app

#install dependencies
COPY package*.json ./
RUN npm install

#copy source code
COPY . .

EXPOSE 3000
CMD ["node", "server.js"]