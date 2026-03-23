"""
Run this once to populate the database with dummy hospitals and doctors.
  python seed.py
"""
from database import get_db

HOSPITALS = [
    {
        "name": "Care Hospital",
        "location": "Hyderabad",
        "address": "Road No. 1, Banjara Hills, Hyderabad 500034",
        "phone": "+91 40-30418000",
        "rating": 4.8,
        "total_reviews": 1200,
        "doctor_count": 120,
        "specialties": ["Cardiology", "Neurology", "Oncology", "Orthopedics"],
        "features": ["Emergency", "ICU", "Pharmacy", "Blood Bank"],
        "image_color": "#1a73e8",
        "description": "Multi-specialty hospital with state-of-the-art facilities and experienced doctors.",
    },
    {
        "name": "Ankura Hospital",
        "location": "Khammam",
        "address": "Main Road, Khammam 507002",
        "phone": "+91 8742-225566",
        "rating": 4.7,
        "total_reviews": 980,
        "doctor_count": 85,
        "specialties": ["Pediatrics", "Gynecology", "Dermatology", "General Surgery"],
        "features": ["Pediatrics", "Surgery", "Lab", "NICU"],
        "image_color": "#4caf50",
        "description": "Advanced healthcare center with specialized departments and modern equipment.",
    },
    {
        "name": "Continental Hospital",
        "location": "Hyderabad",
        "address": "IT Park Road, Nanakramguda, Hyderabad 500032",
        "phone": "+91 40-67000777",
        "rating": 4.9,
        "total_reviews": 1500,
        "doctor_count": 150,
        "specialties": ["Cardiology", "Oncology", "Transplant", "Neurology"],
        "features": ["Cardiology", "Oncology", "24/7", "Cath Lab"],
        "image_color": "#f44336",
        "description": "Comprehensive healthcare services with patient-centered approach.",
    },
    {
        "name": "KIMS Hospital",
        "location": "Secunderabad",
        "address": "Minister Road, Secunderabad 500003",
        "phone": "+91 40-44885000",
        "rating": 4.6,
        "total_reviews": 1100,
        "doctor_count": 200,
        "specialties": ["Neurology", "Transplant", "Orthopedics", "Urology"],
        "features": ["Neuro", "Transplant", "Research", "Robotic Surgery"],
        "image_color": "#9c27b0",
        "description": "Leading healthcare provider with advanced medical technology and expert staff.",
    },
    {
        "name": "Apollo Hospital",
        "location": "Hyderabad",
        "address": "Jubilee Hills, Hyderabad 500033",
        "phone": "+91 40-23607777",
        "rating": 4.5,
        "total_reviews": 2200,
        "doctor_count": 180,
        "specialties": ["Cardiac", "Orthopedics", "Maternity", "Oncology"],
        "features": ["Cardiac", "Ortho", "Maternity", "International"],
        "image_color": "#ff9800",
        "description": "World-class healthcare services with international standards and accreditation.",
    },
    {
        "name": "Yashoda Hospital",
        "location": "Hyderabad",
        "address": "Rajbhavan Road, Somajiguda, Hyderabad 500082",
        "phone": "+91 40-45674567",
        "rating": 4.7,
        "total_reviews": 1300,
        "doctor_count": 160,
        "specialties": ["Oncology", "Gastroenterology", "Pulmonology", "Cardiology"],
        "features": ["Oncology", "Gastro", "ICU", "Dialysis"],
        "image_color": "#009688",
        "description": "Comprehensive multi-specialty hospital with patient-centric care approach.",
    },
]

DOCTORS_TEMPLATE = [
    # Care Hospital
    {
        "name": "Dr. Rajesh Kumar", "specialty": "Cardiologist", "experience_years": 15,
        "rating": 4.9, "consultation_fee": 800, "available_days": ["Mon", "Tue", "Wed", "Fri"],
        "features": ["ECG", "Echo", "Angioplasty"], "image_color": "#bbdefb",
        "description": "Senior consultant with over 15 years of experience in cardiac care.",
        "hospital_index": 0
    },
    {
        "name": "Dr. Suresh Reddy", "specialty": "Neurologist", "experience_years": 12,
        "rating": 4.7, "consultation_fee": 700, "available_days": ["Mon", "Wed", "Thu", "Sat"],
        "features": ["EEG", "MRI", "Stroke Care"], "image_color": "#c8e6c9",
        "description": "Expert in neurological disorders and brain conditions.",
        "hospital_index": 0
    },
    # Ankura
    {
        "name": "Dr. Priya Sharma", "specialty": "Dermatologist", "experience_years": 10,
        "rating": 4.8, "consultation_fee": 600, "available_days": ["Tue", "Wed", "Fri", "Sat"],
        "features": ["Acne", "Hair Loss", "Laser"], "image_color": "#f8bbd9",
        "description": "Expert in cosmetic dermatology and skin care treatments.",
        "hospital_index": 1
    },
    {
        "name": "Dr. Ananya Rao", "specialty": "Pediatrician", "experience_years": 8,
        "rating": 4.9, "consultation_fee": 500, "available_days": ["Mon", "Tue", "Thu", "Sat"],
        "features": ["Vaccination", "Newborn", "Nutrition"], "image_color": "#e1bee7",
        "description": "Child specialist with expertise in newborn care and vaccinations.",
        "hospital_index": 1
    },
    # Continental
    {
        "name": "Dr. Amit Patel", "specialty": "Neurologist", "experience_years": 18,
        "rating": 4.7, "consultation_fee": 900, "available_days": ["Mon", "Wed", "Fri"],
        "features": ["EEG", "EMG", "Stroke"], "image_color": "#ffcdd2",
        "description": "Specialized in treating neurological disorders and brain conditions.",
        "hospital_index": 2
    },
    {
        "name": "Dr. Kavitha Nair", "specialty": "Oncologist", "experience_years": 14,
        "rating": 4.8, "consultation_fee": 1000, "available_days": ["Tue", "Thu", "Sat"],
        "features": ["Chemotherapy", "Immunotherapy", "Biopsy"], "image_color": "#ffe0b2",
        "description": "Specialist in cancer treatment with cutting-edge therapies.",
        "hospital_index": 2
    },
    # KIMS
    {
        "name": "Dr. Vikram Singh", "specialty": "Orthopedic Surgeon", "experience_years": 16,
        "rating": 4.6, "consultation_fee": 750, "available_days": ["Mon", "Tue", "Thu", "Fri"],
        "features": ["Joint Replacement", "Arthroscopy", "Fracture"], "image_color": "#b2dfdb",
        "description": "Expert in joint replacement surgeries and sports injuries.",
        "hospital_index": 3
    },
    {
        "name": "Dr. Ramesh Babu", "specialty": "Urologist", "experience_years": 11,
        "rating": 4.5, "consultation_fee": 650, "available_days": ["Wed", "Thu", "Sat"],
        "features": ["Kidney Stone", "Laparoscopy", "Prostate"], "image_color": "#d1c4e9",
        "description": "Specialized in urological disorders and minimally invasive surgery.",
        "hospital_index": 3
    },
    # Apollo
    {
        "name": "Dr. Anjali Mehta", "specialty": "Gynecologist", "experience_years": 13,
        "rating": 4.8, "consultation_fee": 700, "available_days": ["Mon", "Wed", "Fri", "Sat"],
        "features": ["Pregnancy", "Ultrasound", "Menopause"], "image_color": "#b2ebf2",
        "description": "Specialized in women's health, pregnancy, and reproductive care.",
        "hospital_index": 4
    },
    {
        "name": "Dr. Sunil Mehta", "specialty": "Cardiologist", "experience_years": 20,
        "rating": 4.9, "consultation_fee": 1200, "available_days": ["Tue", "Thu", "Fri"],
        "features": ["Bypass", "Angioplasty", "Pacemaker"], "image_color": "#ffe082",
        "description": "Renowned cardiac surgeon with 20+ years in cardiac interventions.",
        "hospital_index": 4
    },
    # Yashoda
    {
        "name": "Dr. Sunita Reddy", "specialty": "Pediatrician", "experience_years": 9,
        "rating": 4.9, "consultation_fee": 500, "available_days": ["Mon", "Tue", "Wed", "Sat"],
        "features": ["Vaccination", "Newborn", "Nutrition"], "image_color": "#c8e6c9",
        "description": "Child specialist with expertise in newborn care and vaccinations.",
        "hospital_index": 5
    },
    {
        "name": "Dr. Harish Goud", "specialty": "Gastroenterologist", "experience_years": 12,
        "rating": 4.6, "consultation_fee": 700, "available_days": ["Mon", "Wed", "Fri"],
        "features": ["Endoscopy", "Colonoscopy", "Liver Care"], "image_color": "#b2dfdb",
        "description": "Expert in digestive health, liver diseases, and endoscopic procedures.",
        "hospital_index": 5
    },
]


def seed():
    db = get_db()

    print("Seeding hospitals...")
    hosp_result = db.table("hospitals").insert(HOSPITALS).execute()
    hospital_ids = [h["id"] for h in hosp_result.data]
    print(f"  ✓ Created {len(hospital_ids)} hospitals")

    print("Seeding doctors...")
    doctors_to_insert = []
    for d in DOCTORS_TEMPLATE:
        idx = d.pop("hospital_index")
        d["hospital_id"] = hospital_ids[idx]
        doctors_to_insert.append(d)

    doc_result = db.table("doctors").insert(doctors_to_insert).execute()
    print(f"  ✓ Created {len(doc_result.data)} doctors")
    print("\n✅ Seed complete!")


if __name__ == "__main__":
    seed()
