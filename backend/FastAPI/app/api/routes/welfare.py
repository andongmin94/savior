from fastapi import APIRouter
from pandas import read_csv
from pathlib import Path

base_direcdtory = Path(__file__).resolve().parent.parent.parent
router = APIRouter()

@router.get("/load-welfare-data")
async def load_welfare_data():
    file_path = base_direcdtory/"resource/welfare.csv"
    try:
        df = read_csv(file_path)
        df.fillna("", inplace=True)
        return df.to_dict(orient="records")
    except Exception as e:
        return {"fail to read welfare-data": str(e)}
