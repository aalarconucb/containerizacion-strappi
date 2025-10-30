FROM nginx:alpine

# Elimina la config por defecto que provoca el loop
RUN rm /etc/nginx/conf.d/default.conf

# Usaremos un archivo default.conf propio (más simple que sobreescribir nginx.conf)
COPY default.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost/healthz || exit 1
