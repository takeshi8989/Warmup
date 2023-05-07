from pydantic import BaseModel

class UserBase(BaseModel):
    oauth_id: str
    name: str
    email: str
    picture: str


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int

    class Config:
        orm_mode = True