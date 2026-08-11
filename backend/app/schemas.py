from datetime import datetime
from typing import Literal

from pydantic import BaseModel, EmailStr, Field

Status = Literal["applied", "interview", "offer", "rejected"]


class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr

    model_config = {"from_attributes": True}


class SignupIn(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


class ForgotPasswordIn(BaseModel):
    email: EmailStr


class ResetPasswordIn(BaseModel):
    token: str
    password: str = Field(min_length=8, max_length=128)


class UpdateMeIn(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=120)
    email: EmailStr | None = None
    password: str | None = Field(default=None, min_length=8, max_length=128)


class MessageOut(BaseModel):
    message: str
    reset_token: str | None = None


class ApplicationOut(BaseModel):
    id: str
    company: str
    role: str
    status: Status
    appliedDate: str
    jobLink: str
    notes: str
    color: str
    createdAt: datetime | None = None
    updatedAt: datetime | None = None


class ApplicationCreate(BaseModel):
    company: str = Field(min_length=1, max_length=200)
    role: str = Field(min_length=1, max_length=200)
    status: Status = "applied"
    appliedDate: str = Field(min_length=10, max_length=10)
    jobLink: str = ""
    notes: str = ""
    color: str = "#6366f1"


class ApplicationUpdate(BaseModel):
    company: str | None = Field(default=None, min_length=1, max_length=200)
    role: str | None = Field(default=None, min_length=1, max_length=200)
    status: Status | None = None
    appliedDate: str | None = Field(default=None, min_length=10, max_length=10)
    jobLink: str | None = None
    notes: str | None = None
    color: str | None = None
