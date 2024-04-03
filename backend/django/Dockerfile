FROM python:latest

WORKDIR /usr/src/app
# WORKDIR은 cd와 같은 명령으로, 작업 경로를 /usr/src/app으로 이동합니다.
#이 디렉토리는 이미지 내에서 모든 작업이 수행될 위치입니다.
# 쉽게는 manage.py를 가지고 있는 폴더의 위치라고 생각하면 됩니다.

COPY . .
# 이 문장은 현재 디렉토리의 모든 파일과 폴더를 현재 작업 디렉토리(`/usr/src/app`)로 복사합니다.
# 즉, 현재 디렉토리의 모든 파일과 폴더가 이미지 내의 `/usr/src/app` 디렉토리로 복사됩니다.


RUN pip install -r requirements.txt
# CMD ["python", "manage.py", "migrate"]

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
# 이동한 디렉토리에서 django를 가동시켜주는 코드를 작성합니다. 여기서 port는 8000로 실행시키겠습니다.

EXPOSE 8000