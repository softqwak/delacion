from db.database import Base
from sqlalchemy import Column, Integer, String


class User(Base):
    __tablename__ = "users"

    id = Column(Integer,primary_key=True,nullable=False)
    name = Column(String,nullable=False)
