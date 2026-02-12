from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime
import os
import shutil
from pathlib import Path
import json
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI(
    title="Allan Marimo Portfolio API",
    description="Backend API for portfolio, projects, and contact",
    version="1.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create upload directories
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)
APK_DIR = UPLOAD_DIR / "apks"
APK_DIR.mkdir(exist_ok=True)

# Serve uploaded files under /uploads
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

# ==================== MODELS ====================

class ProjectBase(BaseModel):
    name: str
    type: str
    tech: str
    desc: str

class Project(ProjectBase):
    id: int

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str

class ContactResponse(BaseModel):
    success: bool
    message: str

class ProjectUpload(BaseModel):
    title: str
    description: str
    tech_stack: str
    project_type: str

class ProjectFile(BaseModel):
    id: int
    title: str
    description: str
    version: str
    size: str
    downloads: int
    rating: float
    date: str
    tech: str
    file_url: str

# ==================== DATA (In-memory for now) ====================

PORTFOLIO_PROJECTS = [
    {"id": 1, "name": "Quantum-Node", "type": "Automation", "tech": "n8n / Python", "desc": "Lead generation automation. Built systems that turn raw data into qualified leads."},
    {"id": 2, "name": "EcoTrack ZW", "type": "Mobile App", "tech": "React Native", "desc": "Mobile app for environmental monitoring. Real-time data, offline support, clean UX."},
    {"id": 3, "name": "Auth-Titan", "type": "Security", "tech": "Supabase / JWT", "desc": "Authentication system. Secure, scalable, and built right the first time."},
    {"id": 4, "name": "FastAPI Bridge", "type": "Backend", "tech": "Python / Redis", "desc": "API gateway. High-speed, reliable, production-ready backend infrastructure."},
    {"id": 5, "name": "Vision-Retail", "type": "AI", "tech": "OpenCV / Node", "desc": "Computer vision for inventory. AI that actually works in the real world."},
    {"id": 6, "name": "Stripe-Master", "type": "Backend", "tech": "Next.js", "desc": "Payment processing. Complex billing made simple and bulletproof."},
    {"id": 7, "name": "Cloud-S3-UI", "type": "Tools", "tech": "React", "desc": "File management interface. Handles massive amounts of data gracefully."},
    {"id": 8, "name": "Zim-Stock-V2", "type": "Backend", "tech": "PostgreSQL", "desc": "Data system. Real-time price tracking with bulletproof accuracy."},
    {"id": 9, "name": "Dev-Docs-UI", "type": "Design", "tech": "Framer Motion", "desc": "Design system. Beautiful, functional, and easy for teams to use."},
    {"id": 10, "name": "Safe-Chat", "type": "Mobile", "tech": "Expo / SQLite", "desc": "Secure messaging. Encrypted conversations that work offline."},
    {"id": 11, "name": "Portfolio-Core", "type": "Design", "tech": "React / Vite", "desc": "This site. Built for performance and to show what I can do."},
    {"id": 12, "name": "React-Dashboard", "type": "Web", "tech": "React / TypeScript", "desc": "Admin dashboard. Fast, intuitive, and built to scale."},
    {"id": 13, "name": "Python-Scripts", "type": "Backend", "tech": "Python / Automation", "desc": "Automation tools. Making repetitive tasks disappear."},
    {"id": 14, "name": "Mobile-Prototype", "type": "Mobile", "tech": "React Native", "desc": "App prototypes. From idea to working app in days."},
    {"id": 15, "name": "API-Integration", "type": "Backend", "tech": "Node / REST", "desc": "Third-party integrations. Making different systems talk smoothly."},
]

SAMPLE_PROJECTS = [
    {
        "id": 1,
        "title": "EcoTrack ZW",
        "type": "Mobile App (APK)",
        "description": "Environmental monitoring system with real-time hardware telemetry. Track air quality, temperature, and pollution levels in your region.",
        "version": "2.1.0",
        "size": "45.3 MB",
        "downloads": 1240,
        "rating": 4.8,
        "date": "2025-11-15",
        "tech": "React Native, Firebase",
        "file_url": "/uploads/apks/EcoTrack-ZW-2.1.0.apk"
    },
    {
        "id": 2,
        "title": "Safe-Chat",
        "type": "Mobile App (APK)",
        "description": "Encrypted offline-first messaging app for sensitive business data. End-to-end encryption with zero-knowledge architecture.",
        "version": "1.5.2",
        "size": "32.8 MB",
        "downloads": 876,
        "rating": 4.9,
        "date": "2025-10-20",
        "tech": "Expo, SQLite, Crypto",
        "file_url": "/uploads/apks/Safe-Chat-1.5.2.apk"
    },
    {
        "id": 3,
        "title": "Vision-Retail",
        "type": "Desktop App",
        "description": "Automated inventory scanning using computer vision for retail clients. AI-powered product recognition and stock management.",
        "version": "3.2.1",
        "size": "156.4 MB",
        "downloads": 524,
        "rating": 4.7,
        "date": "2025-09-10",
        "tech": "OpenCV, Node.js, Python",
        "file_url": "/uploads/apks/Vision-Retail-3.2.1.exe"
    }
]

# ==================== ENDPOINTS ====================

@app.get("/")
def read_root():
    """Root endpoint - System status"""
    return {
        "status": "Online",
        "architect": "Allan Marimo",
        "tech": "FastAPI",
        "endpoints": {
            "portfolio": "/api/portfolio",
            "projects": "/api/projects",
            "contact": "/api/contact",
            "health": "/health"
        }
    }

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }

# ==================== PORTFOLIO ENDPOINTS ====================

@app.get("/api/portfolio")
def get_portfolio():
    """Get all portfolio projects"""
    return {
        "success": True,
        "count": len(PORTFOLIO_PROJECTS),
        "projects": PORTFOLIO_PROJECTS
    }

@app.get("/api/portfolio/{project_id}")
def get_portfolio_project(project_id: int):
    """Get specific portfolio project"""
    project = next((p for p in PORTFOLIO_PROJECTS if p["id"] == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return {
        "success": True,
        "project": project
    }

@app.get("/api/portfolio/category/{category}")
def get_portfolio_by_category(category: str):
    """Get portfolio projects by category"""
    filtered = [p for p in PORTFOLIO_PROJECTS if p["type"].lower() == category.lower()]
    return {
        "success": True,
        "category": category,
        "count": len(filtered),
        "projects": filtered
    }

# ==================== PROJECTS/DOWNLOADS ENDPOINTS ====================

@app.get("/api/projects")
def get_projects():
    """Get all downloadable projects"""
    return {
        "success": True,
        "count": len(SAMPLE_PROJECTS),
        "projects": SAMPLE_PROJECTS
    }

@app.get("/api/projects/{project_id}")
def get_project(project_id: int):
    """Get specific project details"""
    project = next((p for p in SAMPLE_PROJECTS if p["id"] == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return {
        "success": True,
        "project": project
    }

@app.get("/api/projects/stats")
def get_projects_stats():
    """Get projects statistics"""
    total_downloads = sum(p["downloads"] for p in SAMPLE_PROJECTS)
    avg_rating = sum(p["rating"] for p in SAMPLE_PROJECTS) / len(SAMPLE_PROJECTS)
    total_size = sum(float(p["size"].split()[0]) for p in SAMPLE_PROJECTS)
    
    return {
        "success": True,
        "stats": {
            "total_projects": len(SAMPLE_PROJECTS),
            "total_downloads": total_downloads,
            "average_rating": round(avg_rating, 1),
            "total_size_gb": round(total_size, 1)
        }
    }

@app.post("/api/projects/upload")
async def upload_project(
    title: str = Form(...),
    description: str = Form(...),
    tech_stack: str = Form(...),
    project_type: str = Form(...),
    file: UploadFile = File(None),
    github_url: Optional[str] = Form(None),
    admin_token: Optional[str] = Form(None),
    x_admin_token: Optional[str] = Header(None)
 ):
    """Upload a new project file"""
    # simple admin token check: either provide form field `admin_token` or header `x-admin-token`
    ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", "dev-secret")
    provided_token = admin_token or x_admin_token
    if ADMIN_TOKEN != "dev-secret":
        if not provided_token or provided_token != ADMIN_TOKEN:
            raise HTTPException(status_code=401, detail="Unauthorized: invalid admin token")

    try:
        # Determine source: direct file upload or GitHub/raw URL download
        if github_url:
            # download from provided URL
            import requests

            r = requests.get(github_url, stream=True, timeout=30)
            if r.status_code != 200:
                raise HTTPException(status_code=400, detail="Failed to download from provided URL")

            # attempt to extract filename
            remote_name = github_url.split("/")[-1] or f"project_{int(datetime.now().timestamp())}.apk"
            safe_name = Path(remote_name).name
            file_path = APK_DIR / safe_name
            with open(file_path, "wb") as buffer:
                for chunk in r.iter_content(chunk_size=8192):
                    if chunk:
                        buffer.write(chunk)
        elif file is not None:
            # Save uploaded file
            safe_name = Path(file.filename).name
            file_path = APK_DIR / safe_name
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
        else:
            raise HTTPException(status_code=400, detail="No file or github_url provided")
        
        # Add to projects list
        new_id = max((p["id"] for p in SAMPLE_PROJECTS), default=0) + 1
        new_project = {
            "id": new_id,
            "title": title,
            "description": description,
            "type": project_type,
            "version": "1.0.0",
            "size": f"{os.path.getsize(file_path) / (1024*1024):.1f} MB",
            "downloads": 0,
            "rating": 0,
            "date": datetime.now().strftime("%Y-%m-%d"),
            "tech": tech_stack,
            "file_url": f"/uploads/apks/{file_path.name}"
        }
        SAMPLE_PROJECTS.append(new_project)
        
        return {
            "success": True,
            "message": "Project uploaded successfully",
            "project": new_project
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/projects/{project_id}/download")
def increment_download(project_id: int):
    """Increment download count"""
    project = next((p for p in SAMPLE_PROJECTS if p["id"] == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    project["downloads"] += 1
    return {
        "success": True,
        "downloads": project["downloads"]
    }


@app.get("/api/projects/download/{filename}")
def download_file(filename: str):
    """Stream a file from uploads"""
    safe_name = Path(filename).name
    file_path = APK_DIR / safe_name
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(path=file_path, filename=safe_name)

# ==================== CONTACT ENDPOINTS ====================

@app.post("/api/contact")
def send_contact_message(contact: ContactRequest):
    """Send contact message"""
    try:
        # Here you would integrate with email service (SendGrid, Mailgun, etc.)
        # For now, we'll just log it
        message_data = {
            "name": contact.name,
            "email": contact.email,
            "message": contact.message,
            "timestamp": datetime.now().isoformat()
        }
        
        # Save to file for demonstration
        with open("contact_messages.json", "a") as f:
            f.write(json.dumps(message_data) + "\n")
        
        return {
            "success": True,
            "message": f"Thank you {contact.name}, your message has been received. Allan will get back to you soon.",
            "email_sent_to": "allan@example.com"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/contact/messages")
def get_contact_messages():
    """Get all contact messages (admin only - add authentication later)"""
    messages = []
    if os.path.exists("contact_messages.json"):
        with open("contact_messages.json", "r") as f:
            for line in f:
                if line.strip():
                    messages.append(json.loads(line))
    
    return {
        "success": True,
        "count": len(messages),
        "messages": messages
    }

# ==================== STATS ENDPOINTS ====================

@app.get("/api/stats")
def get_all_stats():
    """Get overall portfolio stats"""
    return {
        "success": True,
        "stats": {
            "portfolio_projects": len(PORTFOLIO_PROJECTS),
            "downloadable_projects": len(SAMPLE_PROJECTS),
            "total_downloads": sum(p["downloads"] for p in SAMPLE_PROJECTS),
            "average_rating": round(sum(p["rating"] for p in SAMPLE_PROJECTS) / len(SAMPLE_PROJECTS), 1) if SAMPLE_PROJECTS else 0
        }
    }

@app.get("/api/categories")
def get_categories():
    """Get all available project categories"""
    categories = list(set(p["type"] for p in PORTFOLIO_PROJECTS))
    return {
        "success": True,
        "categories": sorted(categories),
        "count": len(categories)
    }

# ==================== SEARCH ENDPOINT ====================

@app.get("/api/search")
def search_projects(q: str):
    """Search across portfolio projects"""
    query = q.lower()
    results = [
        p for p in PORTFOLIO_PROJECTS
        if query in p["name"].lower() or query in p["desc"].lower() or query in p["tech"].lower()
    ]
    
    return {
        "success": True,
        "query": q,
        "count": len(results),
        "results": results
    }