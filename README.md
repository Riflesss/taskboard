# TaskBoard — ระบบจัดการงาน

![CI](https://github.com/Riflesss/taskboard/actions/workflows/ci.yml/badge.svg)
![CD](https://github.com/Riflesss/taskboard/actions/workflows/cd.yml/badge.svg)

ระบบ CRUD สำหรับจัดการงาน สร้างด้วย Express.js + PostgreSQL + Vue 3

## Tech Stack
- **Backend:** Node.js + Express.js + PostgreSQL
- **Frontend:** Vue 3 + Vite
- **Container:** Docker + Docker Compose
- **CI/CD:** GitHub Actions

## วิธีรัน (Local)
```bash
# Clone
git clone https://github.com/Riflesss/taskboard.git
cd taskboard

# Copy ตัวอย่าง environment
cp backend/.env.example backend/.env

# รัน ด้วย Docker Compose
docker compose up --build
```
เข้า http://localhost เพื่อดู Frontend

## วิธีรัน Production แบบดึงจาก Docker Hub
```bash
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

## API Endpoints
| Method | Path | คำอธิบาย |
|--------|------|----------|
| GET | /health | Health check |
| GET | /api/tasks | ดึงงานทั้งหมด |
| POST | /api/tasks | สร้างงานใหม่ |
| PUT | /api/tasks/:id | แก้ไขงาน |
| DELETE | /api/tasks/:id | ลบงาน |
powwer by github copirot & S DANG