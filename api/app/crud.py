from sqlalchemy.orm import Session

from . import models, schemas


def get_user(db: Session, user_oauth_id: str):
    return db.query(models.User).filter(models.User.oauth_id == user_oauth_id).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(oauth_id=user.oauth_id, name=user.name, email=user.email, picture=user.picture)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user