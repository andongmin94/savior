import os
import pandas as pd
from .models import Welfarelife, Life

# 출력 경로
file_path = os.getcwd() + "/data-preprocessing/result/"

# 복지-생애주기 데이터
file_name = "220404 행안부 welfarelife.csv"
csv_welfarelife = pd.read_csv(file_path + file_name, encoding='cp949')

welfare_lifes = []

for i in range(len(csv_welfarelife)):
    row = csv_welfarelife.iloc[i]
    welfare_life = Welfarelife()

    life_id = row['welfarelife_life_id']
    if life_id == 0:
        life_id = 1
    life = Life.objects.filter(age_id=life_id)
    # print("id : ",row['welfare_id'])
    welfare_life.welfare_id = row['welfare_id']
    welfare_life.life_id = life_id

    welfare_lifes.append(welfare_life)

Welfarelife.objects.bulk_create(welfare_lifes)

print(welfare_lifes)