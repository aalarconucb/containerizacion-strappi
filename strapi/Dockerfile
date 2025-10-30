FROM node:20-alpine AS deps
WORKDIR /srv/app
COPY package*.json ./
RUN npm ci --only=production || true

FROM node:20-alpine AS app
ENV NODE_ENV=production
WORKDIR /srv/app
COPY --from=deps /srv/app/node_modules ./node_modules
COPY . .
# Si aún no hay build (primera vez), este paso no fallará por 'true'
RUN npm run build || true
EXPOSE 1337
HEALTHCHECK --interval=30s --timeout=5s   CMD wget -qO- http://localhost:1337/admin || exit 1
CMD ["npm","run","start"]
