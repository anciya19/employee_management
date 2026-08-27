from fastapi import FastAPI , Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import crud
import models
import schemas
from database import engine , SessionLocal

app = FastAPI()

models.Base.metadata.create_all(bind = engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3000"],
    allow_credentials = True,
    allow_headers = ["*"],
    allow_methods = ["*"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
@app.post("/employee")
def create_student(employee:schemas.employee_create,db:Session = Depends(get_db)):
    return crud.create_employee(db,employee)

@app.get("/employee")
def get_all_employee(db:Session = Depends(get_db)):
    return crud.get_all_employee(db)
    

@app.delete("/employee/{id}")
def delete_employee(id:int,db:Session = Depends(get_db)):
    return crud.delete_employee(db,id)

@app.put("/employee/{id}")
def update_employee(id:int,employee:schemas.employee_create,db:Session = Depends(get_db)):
    return crud.update_employee(db,id,employee)