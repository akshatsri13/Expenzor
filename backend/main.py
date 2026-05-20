import datetime
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import models, schemas, crud
from database import engine, get_db


# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Expenzor API",
    description="FastAPI Backend with SQLite for Expenzor premium finance tracker",
    version="1.0.0"
)

# Set up CORS middleware to allow connection from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Root Endpoint ---
@app.get("/", tags=["Root"])
def read_root():
    return {
        "status": "online",
        "message": "Welcome to the Expenzor Fintech SaaS API",
        "docs_url": "/docs"
    }

# --- Settings Endpoints ---
@app.get("/api/settings", response_model=schemas.SettingsResponse, tags=["Settings"])
def read_settings(user_id: int, db: Session = Depends(get_db)):
    return crud.get_settings(db, user_id=user_id)

@app.put("/api/settings", response_model=schemas.SettingsResponse, tags=["Settings"])
def update_settings(user_id: int, settings: schemas.SettingsUpdate, db: Session = Depends(get_db)):
    return crud.update_settings(db, settings, user_id=user_id)

# --- Expenses Endpoints ---
@app.get("/api/expenses", response_model=List[schemas.ExpenseResponse], tags=["Expenses"])
def read_expenses(user_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_expenses(db, user_id=user_id, skip=skip, limit=limit)

@app.get("/api/expenses/{expense_id}", response_model=schemas.ExpenseResponse, tags=["Expenses"])
def read_expense(expense_id: int, user_id: int, db: Session = Depends(get_db)):
    db_expense = crud.get_expense(db, expense_id=expense_id, user_id=user_id)
    if db_expense is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Expense with ID {expense_id} not found"
        )
    return db_expense

@app.post("/api/expenses", response_model=schemas.ExpenseResponse, status_code=status.HTTP_201_CREATED, tags=["Expenses"])
def create_expense(user_id: int, expense: schemas.ExpenseCreate, db: Session = Depends(get_db)):
    return crud.create_expense(db=db, expense=expense, user_id=user_id)

@app.put("/api/expenses/{expense_id}", response_model=schemas.ExpenseResponse, tags=["Expenses"])
def update_expense(expense_id: int, user_id: int, expense: schemas.ExpenseUpdate, db: Session = Depends(get_db)):
    db_expense = crud.update_expense(db=db, expense_id=expense_id, expense=expense, user_id=user_id)
    if db_expense is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Expense with ID {expense_id} not found"
        )
    return db_expense

@app.delete("/api/expenses/{expense_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Expenses"])
def delete_expense(expense_id: int, user_id: int, db: Session = Depends(get_db)):
    success = crud.delete_expense(db=db, expense_id=expense_id, user_id=user_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Expense with ID {expense_id} not found"
        )
    return None

@app.post("/api/expenses/reset", status_code=status.HTTP_204_NO_CONTENT, tags=["Expenses"])
def reset_expenses(user_id: int, db: Session = Depends(get_db)):
    crud.reset_all_expenses(db, user_id=user_id)
    return None

# --- User Authentication Endpoints ---
@app.post("/api/auth/signup", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED, tags=["Auth"])
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    return crud.create_user(db=db, user=user)

@app.post("/api/auth/login", response_model=schemas.UserResponse, tags=["Auth"])
def login(credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=credentials.email)
    if not db_user or not crud.verify_password(credentials.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    return db_user
