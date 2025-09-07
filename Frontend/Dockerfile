# Build stage
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm run build


# Serve stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
