from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    # Relationships
    expenses = relationship("Expense", back_populates="user", cascade="all, delete-orphan")
    settings = relationship("Settings", back_populates="user", uselist=False, cascade="all, delete-orphan")

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String, index=True, nullable=False)
    amount = Column(Float, nullable=False)
    category = Column(String, index=True, nullable=False)
    date = Column(String, nullable=False)  # Stored as YYYY-MM-DD
    notes = Column(String, nullable=True)

    # Foreign key for user isolation
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    
    # Relationship
    user = relationship("User", back_populates="expenses")

class Settings(Base):
    __tablename__ = "settings"

    # User ID acts as the primary key since it is a 1-to-1 relationship
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True, index=True)
    budget = Column(Float, default=2000.0)
    dark_mode = Column(Boolean, default=False)
    currency = Column(String, default="INR")
    language = Column(String, default="en")
    dashboard_layout = Column(String, default="grid")
    compact_mode = Column(Boolean, default=False)
    privacy_mode = Column(Boolean, default=False)
    two_factor = Column(Boolean, default=False)
    notifications = Column(Boolean, default=True)

    # Relationship
    user = relationship("User", back_populates="settings")
