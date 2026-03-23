import os
from pathlib import Path
from supabase import create_client, Client
from dotenv import load_dotenv

# Explicitly load .env from the same folder as this file
env_path = Path(__file__).parent / ".env.example"
load_dotenv(dotenv_path=env_path)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError(
        f".env file not found or missing values.\n"
        f"Looking for: {env_path}\n"
        f"SUPABASE_URL = {SUPABASE_URL}\n"
        f"SUPABASE_KEY = {'set' if SUPABASE_KEY else 'missing'}"
    )

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def get_db():
    return supabase