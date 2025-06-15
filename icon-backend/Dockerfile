FROM --platform=arm64 node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 1525

CMD ["node", "index.js"]