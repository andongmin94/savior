from fastapi import APIRouter

from app.api.routes import welfare

api_router = APIRouter()
api_router.include_router(welfare.router, tags=["welfare"])
