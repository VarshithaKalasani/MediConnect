from fastapi import APIRouter, HTTPException, status, Depends
from models import UserRegister, UserLogin, Token, UserOut
from database import get_db
from auth_utils import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=Token)
def register(data: UserRegister):
    db = get_db()

    # Check existing email
    existing = db.table("users").select("id").eq("email", data.email).execute()
    if existing.data:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Check existing phone
    existing_phone = db.table("users").select("id").eq("phone", data.phone).execute()
    if existing_phone.data:
        raise HTTPException(status_code=400, detail="Phone number already registered")

    # Check existing username
    existing_user = db.table("users").select("id").eq("username", data.username).execute()
    if existing_user.data:
        raise HTTPException(status_code=400, detail="Username already taken")

    # Create user
    user_data = {
        "full_name": data.full_name,
        "email": data.email,
        "phone": data.phone,
        "username": data.username,
        "password_hash": hash_password(data.password),
    }
    result = db.table("users").insert(user_data).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to create user")

    user = result.data[0]
    token = create_access_token({"sub": user["id"]})
    return Token(
        access_token=token,
        token_type="bearer",
        user=UserOut(**user),
    )


@router.post("/login", response_model=Token)
def login(data: UserLogin):
    db = get_db()

    # Try email or phone
    result = db.table("users").select("*").eq("email", data.email_or_phone).execute()
    if not result.data:
        result = db.table("users").select("*").eq("phone", data.email_or_phone).execute()

    if not result.data:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user = result.data[0]
    if not verify_password(data.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user["id"]})
    return Token(
        access_token=token,
        token_type="bearer",
        user=UserOut(**user),
    )


@router.get("/me", response_model=UserOut)
def me(current_user=Depends(get_current_user)):
    return UserOut(**current_user)
