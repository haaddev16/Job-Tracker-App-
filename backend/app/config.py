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
        "http://localhost:4173",
        "http://127.0.0.1:4173",
        "https://job-tracker-app-mu-five.vercel.app",
    ]
    # Allows other https deploy previews if needed
    cors_origin_regex: str = r"https://.*\.vercel\.app"


settings = Settings()
