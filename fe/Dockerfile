FROM node:18 AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18
WORKDIR /app
COPY --from=build /app/build /app/build
EXPOSE 3000
CMD ["npx", "serve", "-s", "build"]
