FROM node:16.15.1
EXPOSE 3000
WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install pm2 -g
RUN npm install

COPY . .

CMD ["npm", "start"]