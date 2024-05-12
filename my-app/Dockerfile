FROM node:14 as build

WORKDIR /app/frontend

COPY package*.json ./
RUN npm install
COPY . .
# RUN npm run build

# FROM node:14

# WORKDIR /app/frontend

# COPY --from=build /app/frontend/build ./build

EXPOSE 3000

CMD ["npm", "start"]
