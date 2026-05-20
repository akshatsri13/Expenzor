from pydantic import BaseModel, Field, ConfigDict
from typing import Optional

# Pydantic Schemas for Expense
class ExpenseBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    amount: float = Field(..., gt=0)
    category: str = Field(...)
    date: str = Field(...)  # YYYY-MM-DD
    notes: Optional[str] = None

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseUpdate(BaseModel):
    title: Optional[str] = None
    amount: Optional[float] = None
    category: Optional[str] = None
    date: Optional[str] = None
    notes: Optional[str] = None

class ExpenseResponse(ExpenseBase):
    id: int
    user_id: int

    model_config = ConfigDict(from_attributes=True)

# Pydantic Schemas for Settings
class SettingsBase(BaseModel):
    budget: float = Field(default=2000.0)
    dark_mode: bool = Field(default=False)
    currency: str = Field(default="INR")
    language: str = Field(default="en")
    dashboard_layout: str = Field(default="grid")
    compact_mode: bool = Field(default=False)
    privacy_mode: bool = Field(default=False)
    two_factor: bool = Field(default=False)
    notifications: bool = Field(default=True)

class SettingsUpdate(BaseModel):
    budget: Optional[float] = None
    dark_mode: Optional[bool] = None
    currency: Optional[str] = None
    language: Optional[str] = None
    dashboard_layout: Optional[str] = None
    compact_mode: Optional[bool] = None
    privacy_mode: Optional[bool] = None
    two_factor: Optional[bool] = None
    notifications: Optional[bool] = None

class SettingsResponse(SettingsBase):
    user_id: int

    model_config = ConfigDict(from_attributes=True)

# Pydantic Schemas for User Authentication
class UserBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(...)

class UserCreate(UserBase):
    password: str = Field(..., min_length=6)

class UserLogin(BaseModel):
    email: str = Field(...)
    password: str = Field(...)

class UserResponse(UserBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

