# build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
# usa install en lugar de ci (no requiere package-lock.json)
RUN npm install
COPY . .
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
RUN npm run build

# runtime
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost || exit 1
