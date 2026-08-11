"""Sample applications seeded for new accounts so the board isn't empty."""

from sqlalchemy.orm import Session

from app.models import Application

SAMPLE_APPS = [
    {
        "company": "Stripe",
        "role": "Senior Frontend Engineer",
        "applied_date": "2026-07-10",
        "job_link": "https://stripe.com/jobs",
        "notes": "Referred by a friend at Stripe. Strong culture fit.",
        "status": "applied",
        "color": "#635bff",
    },
    {
        "company": "Vercel",
        "role": "Developer Advocate",
        "applied_date": "2026-07-18",
        "job_link": "",
        "notes": "",
        "status": "applied",
        "color": "#000000",
    },
    {
        "company": "Google",
        "role": "Software Engineer III",
        "applied_date": "2026-07-05",
        "job_link": "https://careers.google.com",
        "notes": "Applied via university referral portal.",
        "status": "applied",
        "color": "#4285f4",
    },
    {
        "company": "Goldman Sachs & Co.",
        "role": "Technology Analyst",
        "applied_date": "2026-07-20",
        "job_link": "",
        "notes": "",
        "status": "applied",
        "color": "#6b5e3a",
    },
    {
        "company": "Figma",
        "role": "Design Engineer",
        "applied_date": "2026-06-28",
        "job_link": "https://figma.com/careers",
        "notes": "Second round scheduled for next week. Technical challenge sent.",
        "status": "interview",
        "color": "#a259ff",
    },
    {
        "company": "Notion",
        "role": "Product Manager",
        "applied_date": "2026-07-01",
        "job_link": "",
        "notes": "Phone screen went well. Technical round pending.",
        "status": "interview",
        "color": "#374151",
    },
    {
        "company": "Linear",
        "role": "Growth Engineer",
        "applied_date": "2026-07-12",
        "job_link": "",
        "notes": "",
        "status": "interview",
        "color": "#5e6ad2",
    },
    {
        "company": "Airbnb",
        "role": "Senior Product Designer",
        "applied_date": "2026-06-20",
        "job_link": "https://airbnb.com/careers",
        "notes": "Competitive offer received — evaluating with advisor.",
        "status": "offer",
        "color": "#ff385c",
    },
    {
        "company": "Netflix",
        "role": "Senior Software Engineer",
        "applied_date": "2026-06-15",
        "job_link": "",
        "notes": "",
        "status": "rejected",
        "color": "#e50914",
    },
    {
        "company": "Shopify",
        "role": "Staff Engineer",
        "applied_date": "2026-07-08",
        "job_link": "",
        "notes": "Position filled internally.",
        "status": "rejected",
        "color": "#5a8a3c",
    },
    {
        "company": "Meta",
        "role": "Product Engineer, Reels",
        "applied_date": "2026-07-03",
        "job_link": "",
        "notes": "",
        "status": "rejected",
        "color": "#0866ff",
    },
]


def seed_sample_applications(db: Session, user_id: str) -> None:
    """Seed demo apps once at signup only. Never called again on login."""
    existing = db.query(Application).filter(Application.user_id == user_id).count()
    if existing > 0:
        return
    for item in SAMPLE_APPS:
        db.add(Application(user_id=user_id, **item))
    db.commit()
