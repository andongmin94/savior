from fastapi import FastAPI
from api.main import app as api_app

app = FastAPI()

app.mount('/api', api_app)
