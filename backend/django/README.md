# Django

### 데이터 전처리
- [복지서비스](/data-preprocessing/welfare_raw.py) API
>[한국사회보장정보원 중앙부처복지서비스](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15090532)로 부터 가져온 데이터 중 필요한 부분을 추출

- [공공서비스]() 데이터
>[행정안전부_공공서비스_20240206](https://www.data.go.kr/data/15126502/fileData.do)


명시적으로 바꾸기  
~~welfare service &rarr; ws~~  
crit &rarr; criteria  
family &rarr; household_type  
dept_name &rarr; deperature  
service_name &rarr; name  
service_content &rarr; content  
howto &rarr; way  
life &rarr; lifecycle
ori_id &rarr; service_id  

### 설치
```bash
pip install -r requirements.txt
```

### 실행
최초 1회
```bash
python manage.py makemigrations
python manage.py migrate
```

서버 실행
```bash
source .venv/Scripts/activate
python manage.py runserver
```