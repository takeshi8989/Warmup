from fastapi import FastAPI, Depends, HTTPException
from typing import List
from . import crud, models, schemas
from .database import SessionLocal, engine
from sqlalchemy.orm import Session
from mangum import Mangum

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
handler = Mangum(app)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/users/", response_model=schemas.User)
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_oauth_id=user.oauth_id)
    if db_user:
        raise HTTPException(status_code=400, detail="the user id already registered")
    return crud.create_user(db=db, user=user)


@app.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_oauth_id}", response_model=schemas.User)
def read_user(user_oauth_id: str, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_oauth_id=user_oauth_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user