
from pydantic import BaseModel


class employee_create(BaseModel):
    id: int
    name: str
    designation: str
    salary: int


class employee_response(BaseModel):
    id: int
    name: str
    designation: str
    salary: int

    class Config:
        from_attributes = True

