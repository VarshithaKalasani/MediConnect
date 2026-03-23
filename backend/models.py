from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import date, time, datetime


# ── Auth ──────────────────────────────────────────────
class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    username: str
    password: str


class UserLogin(BaseModel):
    email_or_phone: str
    password: str


class UserOut(BaseModel):
    id: str
    full_name: str
    email: str
    phone: str
    username: str
    created_at: Optional[str] = None


class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserOut


# ── Hospital ──────────────────────────────────────────
class HospitalOut(BaseModel):
    id: str
    name: str
    location: str
    address: str
    phone: Optional[str] = None
    rating: float
    total_reviews: int
    doctor_count: int
    specialties: List[str]
    features: List[str]
    image_color: str
    description: Optional[str] = None


# ── Doctor ────────────────────────────────────────────
class DoctorOut(BaseModel):
    id: str
    hospital_id: str
    name: str
    specialty: str
    experience_years: int
    rating: float
    consultation_fee: int
    available_days: List[str]
    features: List[str]
    image_color: str
    description: Optional[str] = None
    hospital_name: Optional[str] = None
    hospital_location: Optional[str] = None


# ── Appointment ───────────────────────────────────────
class AppointmentCreate(BaseModel):
    doctor_id: str
    hospital_id: str
    appointment_date: str   # ISO date string: YYYY-MM-DD
    appointment_time: str   # HH:MM
    notes: Optional[str] = None


class AppointmentOut(BaseModel):
    id: str
    user_id: str
    doctor_id: str
    hospital_id: str
    appointment_date: str
    appointment_time: str
    status: str
    notes: Optional[str] = None
    created_at: Optional[str] = None
    doctor_name: Optional[str] = None
    doctor_specialty: Optional[str] = None
    hospital_name: Optional[str] = None
    hospital_location: Optional[str] = None


class AppointmentUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None
