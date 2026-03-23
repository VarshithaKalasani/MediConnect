# 🏥 MediConnect — Hospital Appointment Booking System

A full-stack healthcare appointment platform built with **React 18 + FastAPI + Supabase PostgreSQL**.

---

## 📁 Project Structure

```
mediconnect/
├── README.md
├── .gitignore
├── docker-compose.yml
├── start.sh                    ← One-command local dev startup
│
├── backend/
│   ├── main.py                 ← FastAPI app, CORS, routes
│   ├── database.py             ← Supabase client
│   ├── models.py               ← Pydantic schemas
│   ├── auth_utils.py           ← JWT + bcrypt
│   ├── schema.sql              ← ⭐ Run in Supabase SQL Editor FIRST
│   ├── seed.py                 ← Seeds 6 hospitals + 12 doctors
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── .env.example
│   └── routers/
│       ├── auth.py
│       ├── hospitals.py
│       ├── doctors.py
│       └── appointments.py
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── Dockerfile
    ├── nginx.conf
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── api/client.js
        ├── context/AuthContext.jsx
        ├── styles/globals.css
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── HospitalCard.jsx
        │   ├── DoctorCard.jsx
        │   └── BookingModal.jsx
        └── pages/
            ├── Home.jsx
            ├── Hospitals.jsx
            ├── Doctors.jsx
            ├── Services.jsx
            ├── About.jsx
            ├── Contact.jsx
            ├── Login.jsx
            ├── Register.jsx
            └── Dashboard.jsx
```

---

## 🚀 Setup (3 Steps)

### Step 1 — Supabase

1. Create free account at https://supabase.com → New Project
2. Go to **SQL Editor** → paste `backend/schema.sql` → **Run**
3. Go to **Settings → API** → copy:
   - `Project URL`
   - `service_role` key *(use service_role, NOT anon)*

### Step 2 — Backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env — paste your Supabase URL and service_role key

python seed.py          # Run ONCE to populate hospitals + doctors
uvicorn main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

### Step 3 — Frontend

```bash
cd frontend
npm install
npm run dev
```

App: http://localhost:5173

### One-Command Start

```bash
chmod +x start.sh
./start.sh --seed    # first time
./start.sh           # subsequent runs
```

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | No | Register user |
| POST | `/auth/login` | No | Login (email or phone) |
| GET | `/auth/me` | Yes | Current user |
| GET | `/hospitals` | No | List hospitals (filter: location, search, min_rating) |
| GET | `/hospitals/{id}` | No | Hospital detail |
| GET | `/hospitals/{id}/doctors` | No | Doctors at hospital |
| GET | `/doctors` | No | List doctors (filter: specialty, search, hospital_id) |
| GET | `/doctors/{id}` | No | Doctor detail |
| POST | `/appointments` | Yes | Book appointment |
| GET | `/appointments/my` | Yes | My appointments |
| PATCH | `/appointments/{id}` | Yes | Update appointment |
| DELETE | `/appointments/{id}` | Yes | Cancel appointment |

---

## ✅ Features

- Register / Login with email or phone + JWT auth
- Browse 6 hospitals with location, rating, search filters
- Browse 12 doctors with specialty filter
- Book appointments: date picker + 13 time slots + notes
- Duplicate booking prevention
- Dashboard: stats, profile, upcoming/past tabs
- Cancel upcoming appointments
- Fully responsive design
- Docker + Nginx production-ready

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, React Router v6, Vite 5 |
| HTTP | Axios + interceptors |
| Notifications | react-hot-toast |
| Backend | FastAPI (Python 3.10+) |
| Auth | JWT (python-jose) + bcrypt |
| Database | Supabase PostgreSQL |
| Production | Docker + Nginx |

---

## 🔧 Troubleshooting

| Problem | Fix |
|---------|-----|
| `SUPABASE_URL must be set` | Edit `backend/.env` with correct values |
| Duplicate data on seed | Only run `seed.py` once |
| Blank frontend page | Check backend is running on port 8000 |
| CORS errors | Ensure ports 8000 (backend) and 5173 (frontend) |
| `relation "users" does not exist` | Run `schema.sql` in Supabase SQL Editor |
