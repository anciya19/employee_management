from sqlalchemy.orm import sessionmaker,declarative_base
from sqlalchemy import create_engine

Database_url = "mysql+pymysql://root:Rabanziert19@localhost/employee_db"

engine  = create_engine(Database_url)

SessionLocal = sessionmaker(bind = engine)

Base  = declarative_base()
