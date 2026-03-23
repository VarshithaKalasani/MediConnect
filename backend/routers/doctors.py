from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from models import DoctorOut
from database import get_db

router = APIRouter(prefix="/doctors", tags=["Doctors"])


@router.get("", response_model=List[DoctorOut])
def get_doctors(
    specialty: Optional[str] = Query(None),
    hospital_id: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    min_rating: Optional[float] = Query(None),
):
    db = get_db()
    query = db.table("doctors").select("*, hospitals(name, location)")

    if hospital_id:
        query = query.eq("hospital_id", hospital_id)
    if specialty:
        query = query.ilike("specialty", f"%{specialty}%")
    if min_rating:
        query = query.gte("rating", min_rating)
    if search:
        query = query.ilike("name", f"%{search}%")

    result = query.order("rating", desc=True).execute()
    doctors = []
    for d in (result.data or []):
        hosp = d.pop("hospitals", None) or {}
        d["hospital_name"] = hosp.get("name", "")
        d["hospital_location"] = hosp.get("location", "")
        doctors.append(d)

    return doctors


@router.get("/{doctor_id}", response_model=DoctorOut)
def get_doctor(doctor_id: str):
    db = get_db()
    result = db.table("doctors").select("*, hospitals(name, location)").eq("id", doctor_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Doctor not found")
    d = result.data[0]
    hosp = d.pop("hospitals", None) or {}
    d["hospital_name"] = hosp.get("name", "")
    d["hospital_location"] = hosp.get("location", "")
    return d
