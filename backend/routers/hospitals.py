from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from models import HospitalOut
from database import get_db

router = APIRouter(prefix="/hospitals", tags=["Hospitals"])


@router.get("", response_model=List[HospitalOut])
def get_hospitals(
    location: Optional[str] = Query(None),
    specialty: Optional[str] = Query(None),
    min_rating: Optional[float] = Query(None),
    search: Optional[str] = Query(None),
):
    db = get_db()
    query = db.table("hospitals").select("*")

    if location:
        query = query.ilike("location", f"%{location}%")
    if min_rating:
        query = query.gte("rating", min_rating)
    if search:
        query = query.ilike("name", f"%{search}%")

    result = query.order("rating", desc=True).execute()
    hospitals = result.data or []

    if specialty:
        hospitals = [h for h in hospitals if specialty.lower() in [s.lower() for s in h.get("specialties", [])]]

    return hospitals


@router.get("/{hospital_id}", response_model=HospitalOut)
def get_hospital(hospital_id: str):
    db = get_db()
    result = db.table("hospitals").select("*").eq("id", hospital_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Hospital not found")
    return result.data[0]


@router.get("/{hospital_id}/doctors")
def get_hospital_doctors(hospital_id: str):
    db = get_db()
    result = db.table("doctors").select("*").eq("hospital_id", hospital_id).execute()
    return result.data or []
