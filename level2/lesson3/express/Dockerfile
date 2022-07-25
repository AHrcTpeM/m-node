FROM node:16.15.1

WORKDIR /app

COPY package.json packaje.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

CMD ["node", "express.js"]