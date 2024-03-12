from fastapi import FastAPI, HTTPException
from pandas import read_csv

app = FastAPI()

@app.get("/")
async def read_root():
    return "this page for test fastapi"

@app.get("/load-welfare-data")
async def load_welfare_data():
    file_path = "C:/Users/SSAFY/Desktop/dataset/복지서비스.csv"
    try:
        df = read_csv(file_path)
        df.fillna("", inplace=True)
        return df.to_dict(orient="records")
    except Exception as e:
        return {"error": str(e)}
