FROM node:14

WORKDIR /app/backend

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3001

CMD ["node", "server.js"]