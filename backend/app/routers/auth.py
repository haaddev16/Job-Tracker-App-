import secrets
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.deps import get_current_user
from app.models import PasswordResetToken, User
from app.schemas import (
    ForgotPasswordIn,
    LoginIn,
    MessageOut,
    ResetPasswordIn,
    SignupIn,
    TokenOut,
    UpdateMeIn,
    UserOut,
)
from app.security import create_access_token, hash_password, verify_password
from app.seed import seed_sample_applications

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/signup", response_model=TokenOut, status_code=201)
def signup(body: SignupIn, db: Session = Depends(get_db)) -> TokenOut:
    email = body.email.lower().strip()
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        name=body.name.strip(),
        email=email,
        password_hash=hash_password(body.password),
        auth_provider="email",
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    seed_sample_applications(db, user.id)
    token = create_access_token(user.id)
    return TokenOut(access_token=token, user=UserOut.model_validate(user))


@router.post("/login", response_model=TokenOut)
def login(body: LoginIn, db: Session = Depends(get_db)) -> TokenOut:
    user = db.query(User).filter(User.email == body.email.lower().strip()).first()
    if not user or not verify_password(body.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    return TokenOut(access_token=create_access_token(user.id), user=UserOut.model_validate(user))


@router.post("/logout", response_model=MessageOut)
def logout(_: User = Depends(get_current_user)) -> MessageOut:
    return MessageOut(message="Logged out")


@router.post("/forgot-password", response_model=MessageOut)
def forgot_password(body: ForgotPasswordIn, db: Session = Depends(get_db)) -> MessageOut:
    user = db.query(User).filter(User.email == body.email.lower().strip()).first()
    if not user:
        return MessageOut(message="If that email exists, a reset link was sent")

    token = secrets.token_urlsafe(32)
    row = PasswordResetToken(
        user_id=user.id,
        token=token,
        expires_at=datetime.now(timezone.utc) + timedelta(minutes=15),
    )
    db.add(row)
    db.commit()
    # v1: mock email — return token so frontend/dev can use it
    print(f"[mock-email] password reset for {user.email}: token={token}")
    return MessageOut(message="If that email exists, a reset link was sent", reset_token=token)


@router.post("/reset-password", response_model=MessageOut)
def reset_password(body: ResetPasswordIn, db: Session = Depends(get_db)) -> MessageOut:
    row = db.query(PasswordResetToken).filter(PasswordResetToken.token == body.token).first()
    if not row or row.used:
        raise HTTPException(status_code=400, detail="Invalid reset token")
    if row.expires_at.replace(tzinfo=timezone.utc) < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="Reset token expired")

    user = db.get(User, row.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.password_hash = hash_password(body.password)
    row.used = True
    db.commit()
    return MessageOut(message="Password updated")


@router.get("/me", response_model=UserOut)
def me(user: User = Depends(get_current_user)) -> UserOut:
    return UserOut.model_validate(user)


@router.patch("/me", response_model=UserOut)
def update_me(
    body: UpdateMeIn,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> UserOut:
    if body.name is not None:
        user.name = body.name.strip()
    if body.email is not None:
        email = body.email.lower().strip()
        exists = db.query(User).filter(User.email == email, User.id != user.id).first()
        if exists:
            raise HTTPException(status_code=400, detail="Email already in use")
        user.email = email
    if body.password is not None:
        user.password_hash = hash_password(body.password)
    db.commit()
    db.refresh(user)
    return UserOut.model_validate(user)


@router.delete("/me", response_model=MessageOut)
def delete_me(user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> MessageOut:
    db.delete(user)
    db.commit()
    return MessageOut(message="Account deleted")
