# 🐳 Proyecto Final - Conteinerización y Orquestación de Contenedores

**Autor:** Alvaro Alarcón Reynaga  
**Herramienta asignada:** K3D  
**Curso:** Módulo 9 - Maestría en Ingeniería de Software Avanzada  - UCB Sede Tarija
**Año:** 2025

---

## 📘 Descripción general

Este proyecto aplica los conocimientos sobre **contenedores, redes, volúmenes, servicios, orquestación y despliegue** en entornos **Docker Compose**, **Docker Swarm** y **Kubernetes (K3D)**.

Se implementa una **aplicación modular** basada en **Strapi CMS (backend)**, **React/Vite (frontend)** y **Nginx (gateway)**, con persistencia en **PostgreSQL** y cache con **Redis**.

---

## 🧩 Arquitectura de la aplicación

### 🔹 Componentes principales

| Servicio | Rol | Imagen base | Persistencia | Exposición |
|-----------|-----|--------------|---------------|-------------|
| **Gateway (Nginx)** | Reverse proxy, balanceo, rutas / /api /admin | `nginx:alpine` | No | Puerto **80** |
| **Frontend** | SPA React/Vite | `node:20-alpine` (build) / `nginx:alpine` (runtime) | No | Interno |
| **Backend (Strapi)** | CMS API | `node:20-alpine` | Volumen `/srv/app/public/uploads` | Interno |
| **PostgreSQL** | Base de datos | `postgres:16-alpine` | Volumen `/var/lib/postgresql/data` | Interno |
| **Redis** | Cache | `redis:7-alpine` | No | Interno |

---

## 🧱 1. Conteinerización (Docker Compose)

### 📂 Estructura de carpetas

```
containerizacion-scaffold/
├─ gateway/           → Nginx (reverse proxy)
├─ frontend/          → React/Vite SPA
├─ strapi/            → Strapi CMS
├─ k8s/               → Manifiestos para K3D/Kubernetes
├─ .env               → Variables de entorno
├─ docker-compose.yml → Despliegue local
└─ stack-deploy.yml   → Despliegue en Swarm
```

---

### ⚙️ `docker-compose.yml`

(Contenido omitido aquí por brevedad, incluido en documentación del proyecto.)

### ▶️ Comandos

```bash
docker compose build
docker compose up -d
docker compose ps
docker compose logs -f
```

**Endpoints:**
- Frontend → [http://localhost/](http://localhost/)
- Strapi API → [http://localhost/api/](http://localhost/api/)
- Panel Strapi → [http://localhost/admin](http://localhost/admin)

---

## ⚓ 2. Despliegue en Docker Swarm

### 🧠 Concepto
Docker Swarm permite **orquestar múltiples contenedores como servicios replicados** con alta disponibilidad, escalabilidad y balanceo de carga.

### 📋 Pasos prácticos

```bash
docker swarm init
docker network create --driver=overlay app-net
printf "superseguro" | docker secret create pg_password -
docker config create gateway_default.conf ./gateway/default.conf
docker stack deploy -c stack-deploy.yml app
docker stack services app
docker stack ps app
docker service logs -f app_gateway
```

---

## ☸️ 3. Despliegue en Kubernetes (K3D)

### 🧭 Creación del clúster
```bash
k3d cluster create ruv --servers 1 --agents 2 --api-port 6550 -p "80:80@loadbalancer"
kubectl cluster-info
kubectl get nodes
```

### 📦 Aplicación de manifiestos
```bash
kubectl apply -f k8s/namespace.yaml
kubectl -n app apply -f k8s/secret-app.yaml
kubectl -n app apply -f k8s/configmap-nginx.yaml
kubectl -n app apply -f k8s/postgres-statefulset.yaml
kubectl -n app apply -f k8s/redis-deployment.yaml
kubectl -n app apply -f k8s/strapi-deployment.yaml
kubectl -n app apply -f k8s/frontend-deployment.yaml
kubectl -n app apply -f k8s/svc-gateway-lb.yaml
```

**Acceso:**
- Frontend → http://localhost/
- API → http://localhost/api/
- Panel Strapi → http://localhost/admin

---

## 🔁 4. Versionamiento (requisito del examen)
```bash
docker compose build frontend
docker tag alvaro/frontend:v1 alvaroalarcon/frontend:v2
docker push alvaroalarcon/frontend:v2
kubectl -n app set image deployment/frontend frontend=alvaroalarcon/frontend:v2
kubectl -n app rollout status deployment/frontend
kubectl -n app rollout history deployment/frontend
kubectl -n app rollout undo deployment/frontend
```

---

## 🧾 5. Repositorio de imágenes (Docker Hub)

| Servicio | Imagen | Tags |
|-----------|---------|------|
| Gateway | [alvaroalarcon/gateway](https://hub.docker.com/r/alvaroalarcon/gateway) | v1, v2 |
| Frontend | [alvaroalarcon/frontend](https://hub.docker.com/r/alvaroalarcon/frontend) | v1, v2 |
| Backend | [alvaroalarcon/strapi](https://hub.docker.com/r/alvaroalarcon/strapi) | v1, v2 |

---

## ✅ Conclusiones

- Se diseñó una arquitectura modular con **5 servicios** interconectados.  
- Se aplicaron buenas prácticas de **conteinerización y orquestación**.  
- Se demostró despliegue exitoso en **Docker Compose**, **Swarm** y **Kubernetes (K3D)**.  
- Se implementó **versionamiento de imágenes Docker (v1 y v2)** con actualización continua.  
- Todas las pruebas funcionales fueron exitosas.
