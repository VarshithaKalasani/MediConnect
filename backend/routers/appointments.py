from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models import AppointmentCreate, AppointmentOut, AppointmentUpdate
from database import get_db
from auth_utils import get_current_user

router = APIRouter(prefix="/appointments", tags=["Appointments"])


def _enrich(appt: dict, db) -> dict:
    """Attach doctor and hospital name to appointment dict."""
    doc = db.table("doctors").select("name, specialty").eq("id", appt["doctor_id"]).execute()
    hosp = db.table("hospitals").select("name, location").eq("id", appt["hospital_id"]).execute()
    appt["doctor_name"] = doc.data[0]["name"] if doc.data else ""
    appt["doctor_specialty"] = doc.data[0]["specialty"] if doc.data else ""
    appt["hospital_name"] = hosp.data[0]["name"] if hosp.data else ""
    appt["hospital_location"] = hosp.data[0]["location"] if hosp.data else ""
    return appt


@router.post("", response_model=AppointmentOut)
def create_appointment(data: AppointmentCreate, current_user=Depends(get_current_user)):
    db = get_db()

    # Check doctor exists
    doc = db.table("doctors").select("id").eq("id", data.doctor_id).execute()
    if not doc.data:
        raise HTTPException(status_code=404, detail="Doctor not found")

    # Check for duplicate booking
    existing = (
        db.table("appointments")
        .select("id")
        .eq("doctor_id", data.doctor_id)
        .eq("appointment_date", data.appointment_date)
        .eq("appointment_time", data.appointment_time)
        .neq("status", "cancelled")
        .execute()
    )
    if existing.data:
        raise HTTPException(status_code=409, detail="This time slot is already booked")

    appt_data = {
        "user_id": current_user["id"],
        "doctor_id": data.doctor_id,
        "hospital_id": data.hospital_id,
        "appointment_date": data.appointment_date,
        "appointment_time": data.appointment_time,
        "notes": data.notes,
        "status": "confirmed",
    }
    result = db.table("appointments").insert(appt_data).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to create appointment")

    return _enrich(result.data[0], db)


@router.get("/my", response_model=List[AppointmentOut])
def my_appointments(current_user=Depends(get_current_user)):
    db = get_db()
    result = (
        db.table("appointments")
        .select("*")
        .eq("user_id", current_user["id"])
        .order("appointment_date", desc=True)
        .execute()
    )
    return [_enrich(a, db) for a in (result.data or [])]


@router.patch("/{appointment_id}", response_model=AppointmentOut)
def update_appointment(
    appointment_id: str,
    data: AppointmentUpdate,
    current_user=Depends(get_current_user),
):
    db = get_db()
    existing = db.table("appointments").select("*").eq("id", appointment_id).eq("user_id", current_user["id"]).execute()
    if not existing.data:
        raise HTTPException(status_code=404, detail="Appointment not found")

    update_data = {k: v for k, v in data.model_dump().items() if v is not None}
    result = db.table("appointments").update(update_data).eq("id", appointment_id).execute()
    return _enrich(result.data[0], db)


@router.delete("/{appointment_id}")
def cancel_appointment(appointment_id: str, current_user=Depends(get_current_user)):
    db = get_db()
    existing = db.table("appointments").select("*").eq("id", appointment_id).eq("user_id", current_user["id"]).execute()
    if not existing.data:
        raise HTTPException(status_code=404, detail="Appointment not found")

    db.table("appointments").update({"status": "cancelled"}).eq("id", appointment_id).execute()
    return {"message": "Appointment cancelled successfully"}
