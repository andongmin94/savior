from fastapi import FastAPI
from routes.main import app as welfare_app

app = FastAPI()

app.mount('/api', welfare_app)
