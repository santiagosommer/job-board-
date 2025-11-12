# JobBoard

## How to run locally

### Run backend

Make sure you have **Docker** and **Docker Compose** installed

Build and run containers:
```bash
- docker compose up -d --build
```

Run containers:
```bash
- npm run docker:up
```
Check logs for debugging:
```bash
- docker compose logs -f backend
```
This will start containers for
1. Node.js backend
2. Redis
3. MySQL
4. ElasticSearch

The backend will be available at `http://localhost:3000`

### To stop backend

```bash
- npm run docker:down
```
---
### Run frontend

```bash
- cd frontend
- npm install
- npm run dev
```