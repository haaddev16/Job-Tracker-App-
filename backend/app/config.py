from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Job Tracker API"
    database_url: str = "sqlite:///./job_tracker.db"
    secret_key: str = "job-tracker-dev-secret-change-in-prod"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24 * 7  # 7 days
    cors_origins: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]


settings = Settings()
