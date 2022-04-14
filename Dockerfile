FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run install-client

RUN npm run build-client

EXPOSE 5000

CMD ["bash", "start.sh"]