from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # App
    app_title: str = "Allan Marimo Portfolio API"
    app_version: str = "1.0.0"
    debug: bool = True
    environment: str = "development"
    
    # API
    api_prefix: str = "/api"
    
    # CORS
    allowed_origins: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5175",
        "http://192.168.1.89:5175",
        "https://allanmarimo.com",
    ]
    
    # Upload
    max_upload_size: int = 500000000  # 500MB
    upload_path: str = "./uploads"
    
    # Database
    database_url: str = "sqlite:///./portfolio.db"
    
    # Email
    smtp_server: str = "smtp.gmail.com"
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    contact_email: str = "allan@example.com"
    
    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()
