from sqlalchemy import Column,Integer,String
from database import Base
# Employee table
class Employee(Base):
    
    __tablename__ = "employees_management"
    
    id = Column (Integer,primary_key=True)
    name = Column(String(100))
    designation = Column(String(100))
    salary = Column(Integer)