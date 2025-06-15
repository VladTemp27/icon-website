FROM --platform=arm64 node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

RUN npm run build

EXPOSE 1525

CMD ["node", "dist/index.js"]