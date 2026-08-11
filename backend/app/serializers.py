from app.models import Application
from app.schemas import ApplicationOut


def app_to_out(row: Application) -> ApplicationOut:
    return ApplicationOut(
        id=row.id,
        company=row.company,
        role=row.role,
        status=row.status,  # type: ignore[arg-type]
        appliedDate=row.applied_date,
        jobLink=row.job_link or "",
        notes=row.notes or "",
        color=row.color or "#6366f1",
        createdAt=row.created_at,
        updatedAt=row.updated_at,
    )
