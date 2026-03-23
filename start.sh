#!/usr/bin/env bash
# MediConnect — one-command local dev startup
set -e

BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}"
echo "  __  __          _ _ _____                            _   "
echo " |  \/  |        | (_)/ ____|                          | |  "
echo " | \  / | ___  __| |_| |     ___  _ __  _ __   ___  ___| |_ "
echo " | |\/| |/ _ \/ _\` | | |    / _ \| '_ \| '_ \ / _ \/ __| __|"
echo " | |  | |  __/ (_| | | |___| (_) | | | | | | |  __/ (__| |_ "
echo " |_|  |_|\___|\__,_|_|\_____\___/|_| |_|_| |_|\___|\___|\__|"
echo -e "${NC}"
echo -e "${GREEN}Hospital Appointment Booking System — Local Dev Starter${NC}\n"

# ── Check .env ─────────────────────────────────────────────────────────────
if [ ! -f backend/.env ]; then
  echo -e "${YELLOW}⚠  backend/.env not found. Copying from .env.example...${NC}"
  cp backend/.env.example backend/.env
  echo -e "${RED}✋ Please edit backend/.env with your Supabase URL and KEY before continuing.${NC}"
  exit 1
fi

# ── Backend ────────────────────────────────────────────────────────────────
echo -e "${BLUE}[1/4]${NC} Installing Python dependencies..."
cd backend
pip install -r requirements.txt -q
cd ..

echo -e "${BLUE}[2/4]${NC} Starting FastAPI backend on http://localhost:8000 ..."
cd backend
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!
cd ..
sleep 2

# ── Seed (only if flag passed) ─────────────────────────────────────────────
if [[ "$1" == "--seed" ]]; then
  echo -e "${BLUE}[2.5]${NC} Seeding database with dummy data..."
  cd backend && python seed.py && cd ..
fi

# ── Frontend ───────────────────────────────────────────────────────────────
echo -e "${BLUE}[3/4]${NC} Installing Node dependencies..."
cd frontend
npm install --silent
cd ..

echo -e "${BLUE}[4/4]${NC} Starting React frontend on http://localhost:5173 ..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# ── Summary ───────────────────────────────────────────────────────────────
sleep 2
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  ✅  MediConnect is running!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "  🌐 Frontend :  ${BLUE}http://localhost:5173${NC}"
echo -e "  🔌 Backend  :  ${BLUE}http://localhost:8000${NC}"
echo -e "  📚 API Docs :  ${BLUE}http://localhost:8000/docs${NC}"
echo ""
echo -e "  Press ${YELLOW}Ctrl+C${NC} to stop all servers."
echo ""

# Wait and cleanup on exit
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo -e '\n${YELLOW}Servers stopped.${NC}'" EXIT
wait
