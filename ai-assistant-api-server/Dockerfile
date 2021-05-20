FROM node:10-alpine

WORKDIR /opt/app

COPY ["package.json", "index.js", "./"]	

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]