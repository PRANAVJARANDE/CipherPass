
# Stage 1: Build React app
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Use relative API URLs through the Nginx proxy
ENV VITE_BACKEND_URL=""

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
