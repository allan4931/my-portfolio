from sqlalchemy import Column, Integer, String, Text, Float, DateTime, Boolean
from sqlalchemy.sql import func
from app.database import Base
from datetime import datetime

class PortfolioProject(Base):
    __tablename__ = "portfolio_projects"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True)
    type = Column(String(100), index=True)
    tech = Column(String(255))
    desc = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class DownloadableProject(Base):
    __tablename__ = "downloadable_projects"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), unique=True, index=True)
    description = Column(Text)
    type = Column(String(100))
    version = Column(String(20))
    size = Column(String(50))
    downloads = Column(Integer, default=0)
    rating = Column(Float, default=0)
    release_date = Column(String(20))
    tech_stack = Column(String(255))
    file_url = Column(String(500))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class ContactMessage(Base):
    __tablename__ = "contact_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    email = Column(String(255), index=True)
    message = Column(Text)
    read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
