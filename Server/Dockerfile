FROM node:14 as build

WORKDIR /app/backend

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:14

WORKDIR /app/backend

COPY --from=build /app/backend/build ./build

EXPOSE 3000

CMD ["node", "server.js"]
