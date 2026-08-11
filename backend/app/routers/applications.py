from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.deps import get_current_user
from app.models import Application, User
from app.schemas import ApplicationCreate, ApplicationOut, ApplicationUpdate, MessageOut
from app.serializers import app_to_out

router = APIRouter(prefix="/api/applications", tags=["applications"])


@router.get("", response_model=list[ApplicationOut])
def list_applications(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[ApplicationOut]:
    rows = (
        db.query(Application)
        .filter(Application.user_id == user.id)
        .order_by(Application.created_at.desc())
        .all()
    )
    return [app_to_out(r) for r in rows]


@router.post("", response_model=ApplicationOut, status_code=201)
def create_application(
    body: ApplicationCreate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> ApplicationOut:
    row = Application(
        user_id=user.id,
        company=body.company.strip(),
        role=body.role.strip(),
        status=body.status,
        applied_date=body.appliedDate,
        job_link=body.jobLink.strip() if body.jobLink else "",
        notes=body.notes.strip() if body.notes else "",
        color=body.color or "#6366f1",
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return app_to_out(row)


@router.patch("/{app_id}", response_model=ApplicationOut)
def update_application(
    app_id: str,
    body: ApplicationUpdate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> ApplicationOut:
    row = (
        db.query(Application)
        .filter(Application.id == app_id, Application.user_id == user.id)
        .first()
    )
    if not row:
        raise HTTPException(status_code=404, detail="Application not found")

    data = body.model_dump(exclude_unset=True)
    mapping = {
        "appliedDate": "applied_date",
        "jobLink": "job_link",
    }
    for key, value in data.items():
        attr = mapping.get(key, key)
        if isinstance(value, str) and key in ("company", "role", "jobLink", "notes"):
            value = value.strip()
        setattr(row, attr, value)

    db.commit()
    db.refresh(row)
    return app_to_out(row)


@router.delete("/{app_id}", response_model=MessageOut)
def delete_application(
    app_id: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> MessageOut:
    row = (
        db.query(Application)
        .filter(Application.id == app_id, Application.user_id == user.id)
        .first()
    )
    if not row:
        raise HTTPException(status_code=404, detail="Application not found")
    db.delete(row)
    db.commit()
    return MessageOut(message="Application deleted")
