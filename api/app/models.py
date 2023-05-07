from sqlalchemy import Column, String, Integer, Sequence
from .database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, Sequence('users_id_seq'), primary_key=True)
    oauth_id = Column(String, index=True, unique=True)
    name = Column(String)
    email = Column(String)
    picture = Column(String)
