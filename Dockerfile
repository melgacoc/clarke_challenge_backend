FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN npm install --save-dev sequelize-cli

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start:dev"]
