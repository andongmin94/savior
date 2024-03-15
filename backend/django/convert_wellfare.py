from contextlib import nullcontext
import requests
from bs4 import BeautifulSoup
import pandas as pd

# convert to csv
welfare_list = []

open_api_key = 'rPO%2F6Iu0tAsSbMunY2SA%2FeMkdH0NiHRsNzYHu%2B%2F8Mnlh3xVi91YCwJdaxrOd%2F9yMRRTVcFpYlXuqB5LxJzD1%2Bw%3D%3D'
params ='&callTp=L&pageNo=1&numOfRows=500&srchKeyCode=003'
params2 ='&callTp=D'


open_url = 'http://apis.data.go.kr/B554287/NationalWelfareInformations/NationalWelfarelist?serviceKey=' + open_api_key + params
open_url2='http://apis.data.go.kr/B554287/NationalWelfareInformations/NationalWelfaredetailed?serviceKey='+open_api_key+ params2 + "&servId="

res = requests.get(open_url)
soup = BeautifulSoup(res.content, 'html.parser')

data=soup.find_all('servlist')

for i in range(100):
    servid=data[i].find('servid').get_text()
    print(servid) #아이디 파싱
    res2 = requests.get(open_url2+servid)
    soup2 = BeautifulSoup(res2.content, 'html.parser')
    print(soup2)
    welfare_service_name=soup2.find_all('servnm')[0].get_text().strip() # 서비스명
    welfare_dept_name=soup2.find_all('jurmnofnm')[0].get_text().strip() # 소관부처명
    welfare_target_detail=soup2.find_all('tgtrdtlcn')[0].get_text().strip() # 대상자 상세내용
    welfare_crit=soup2.find_all('slctcritcn')[0].get_text() # 선정기준
    welfare_service_content=soup2.find_all('alwservcn')[0].get_text().strip() # 서비스내용
    welfare_howto=soup2.find_all('servsedetaillink')[0].get_text().strip() # 서비스신청방법
    welfare_contact=None
    welfare_phone=None
    if(len(soup2.find_all('inqplctadrlist'))!=0):
        if(soup2.find_all('inqplctadrlist')[0].find('servsedetailnm')):
            welfare_contact=soup2.find_all('inqplctadrlist')[0].find('servsedetailnm').get_text().strip() # 문의처
        if(soup2.find_all('inqplctadrlist')[0].find('servsedetaillink')):
            welfare_phone=soup2.find_all('inqplctadrlist')[0].find('servsedetaillink').get_text().strip() #연락처
    welfare_site_name=None
    welfare_site_link=None
    if(len(soup2.find_all('inqplhmpgreldlist'))!=0):
        if(soup2.find_all('inqplhmpgreldlist')[0].find('servsedetailnm')):
            welfare_site_name=soup2.find_all('inqplhmpgreldlist')[0].find('servsedetailnm').get_text().strip() #사이트명
        if(soup2.find_all('inqplhmpgreldlist')[0].find('servsedetaillink')):
            welfare_site_link=soup2.find_all('inqplhmpgreldlist')[0].find('servsedetaillink').get_text().strip() #사이트링크

    welfare_family=12 # 가구유형
    welfare_target=5 # 대상특성
    welfare_purpose=9 # 사업목적
    welfare_life=6 # 생애주기 6은 전연령대

    if(len(soup2.find_all('lifearray'))!=0):
        welfare_life=soup2.find_all('lifearray')[0].get_text().strip()
    if(len(soup2.find_all('trgterindvdlarray'))!=0):
        welfare_family=soup2.find_all('trgterindvdlarray')[0].get_text().strip() #가구유형
    if(len(soup2.find_all('chartrgterarray'))!=0):
        welfare_target=soup2.find_all('chartrgterarray')[0].get_text().strip()# 대상특성
    if(len(soup2.find_all('desirearray'))!=0):
        welfare_purpose=soup2.find_all('desirearray')[0].get_text().strip()# 사업목적   
    
    welfare=pd.DataFrame({
        'welfare_id':[servid],
        'welfare_service_name':[welfare_service_name],
        'welfare_dept_name':[welfare_dept_name],
        'welfare_target_detail':[welfare_target_detail],
        'welfare_crit':[welfare_crit],
        'welfare_service_content':[welfare_service_content],
        'welfare_howto':[welfare_howto],
        'welfare_contact':[welfare_contact],
        'welfare_phone':[welfare_phone],
        'welfare_site_name':[welfare_site_name],
        'welfare_site_link':[welfare_site_link],
        'welfare_purpose':[welfare_purpose],
        'welfare_family':[welfare_family],
        'welfare_target':[welfare_target],
        'welfare_life':[welfare_life],
    })
    welfare_list.append(welfare)

resultSet=pd.concat(welfare_list)
file_name= 'wellfare.csv'
resultSet.to_csv('C:/Users/SSAFY/Desktop/dataset/'+file_name,index=False,encoding='utf-8-sig')
print(file_name,'완료')