from sqlalchemy.orm import Session
from models import Employee
#this comment for add by anciya

def create_employee(db:Session,employee):
    new_employee = Employee(**employee.dict())
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    return new_employee

def get_all_employee(db:Session):
    employees = db.query(Employee).all()
    return employees
    
def delete_employee(db:Session,id:int):
    employee = db.query(Employee).filter(Employee.id == id).first()
    if employee:
        db.delete(employee)
        db.commit()
        return {"message":"Employee deleted successfully"}
    else:
        return {"message":"Employee not found"}
    
def update_employee(db:Session,id:int,employee):
    employee_to_update = db.query(Employee).filter(Employee.id == id).first()
    if employee_to_update:
        employee_to_update.name = employee.name
        employee_to_update.designation = employee.designation
        employee_to_update.salary = employee.salary
        db.commit()
        db.refresh(employee_to_update)  
        return employee_to_update
    else:
        return {"message":"Employee not found"}
    