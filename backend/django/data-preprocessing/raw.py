import pandas as pd
import requests
from bs4 import BeautifulSoup

# 파일에 저장
welfare_list = []

# WELFARE_API_KEY 숨기기
WELFARE_API_KEY = 'rPO%2F6Iu0tAsSbMunY2SA%2FeMkdH0NiHRsNzYHu%2B%2F8Mnlh3xVi91YCwJdaxrOd%2F9yMRRTVcFpYlXuqB5LxJzD1%2Bw%3D%3D'

welfare_list_endpoint = 'http://apis.data.go.kr/B554287/NationalWelfareInformations/NationalWelfarelist'
welfare_detail_endpoint = 'http://apis.data.go.kr/B554287/NationalWelfareInformations/NationalWelfaredetailed'

query_parameter_detail ='&callTp=D'

welfare_list_url = (welfare_list_endpoint
                    + '?serviceKey=' + WELFARE_API_KEY
                    + '&callTp=L'
                    + '&pageNo=1'
                    + '&numOfRows=500'
                    + '&srchKeyCode=003')
# servId 필요
welfare_detail_url = (welfare_detail_endpoint
                      + '?serviceKey=' + WELFARE_API_KEY
                      + '&callTp=D'
                      + '&servId=')

response_list = requests.get(welfare_list_url)
# soup_list = BeautifulSoup(response_list.content, 'html.parser')
soup_list = BeautifulSoup(response_list.content, 'lxml-xml')

data = soup_list.find_all('servList')

for i in range(100):
    servId = data[i].find('servId').get_text()
    print(servId) # 아이디 파싱
    response_detail = requests.get(welfare_detail_url + servId)
    # soup_detail = BeautifulSoup(response_detail.content, 'html.parser')
    soup_detail = BeautifulSoup(response_detail.content, 'lxml-xml')
    print(soup_detail)
    welfare_service_name = soup_detail.find_all('servNm')[0].get_text().strip() # 서비스명
    welfare_dept_name = soup_detail.find_all('jurMnofNm')[0].get_text().strip() # 소관부처명
    welfare_target_detail = soup_detail.find_all('tgtrDtlCn')[0].get_text().strip() # 대상자상세내용
    welfare_crit = soup_detail.find_all('slctCritCn')[0].get_text() # 선정기준
    welfare_service_content = soup_detail.find_all('alwServCn')[0].get_text().strip() # 서비스내용
    welfare_howto = soup_detail.find_all('servSeDetailLink')[0].get_text().strip() # 서비스신청방법
    welfare_contact = None
    welfare_phone = None
    if(len(soup_detail.find_all('inqplctadrlist'))!= 0):
        if(soup_detail.find_all('inqplctadrlist')[0].find('servsedetailnm')):
            welfare_contact = soup_detail.find_all('inqplctadrlist')[0].find('servsedetailnm').get_text().strip() # 문의처
        if(soup_detail.find_all('inqplctadrlist')[0].find('servSeDetailLink')):
            welfare_phone = soup_detail.find_all('inqplctadrlist')[0].find('servSeDetailLink').get_text().strip() # 연락처
    welfare_site_name = None
    welfare_site_link = None
    if(len(soup_detail.find_all('inqplhmpgreldlist'))!= 0):
        if(soup_detail.find_all('inqplhmpgreldlist')[0].find('servsedetailnm')):
            welfare_site_name = soup_detail.find_all('inqplhmpgreldlist')[0].find('servsedetailnm').get_text().strip() # 사이트명
        if(soup_detail.find_all('inqplhmpgreldlist')[0].find('servSeDetailLink')):
            welfare_site_link = soup_detail.find_all('inqplhmpgreldlist')[0].find('servSeDetailLink').get_text().strip() # 사이트링크

    welfare_family = 12 # 가구유형
    welfare_target = 5 # 대상특성
    welfare_purpose = 9 # 사업목적
    welfare_life = 6 # 생애주기 6은 전연령대

    if(len(soup_detail.find_all('lifearray'))!= 0):
        welfare_life = soup_detail.find_all('lifearray')[0].get_text().strip()
    if(len(soup_detail.find_all('trgterindvdlarray'))!= 0):
        welfare_family = soup_detail.find_all('trgterindvdlarray')[0].get_text().strip() # 가구유형
    if(len(soup_detail.find_all('chartrgterarray'))!= 0):
        welfare_target = soup_detail.find_all('chartrgterarray')[0].get_text().strip()# 대상특성
    if(len(soup_detail.find_all('desirearray'))!= 0):
        welfare_purpose = soup_detail.find_all('desirearray')[0].get_text().strip()# 사업목적

    welfare = pd.DataFrame({
        'welfare_id': [servId],
        'welfare_service_name': [welfare_service_name],
        'welfare_dept_name': [welfare_dept_name],
        'welfare_target_detail': [welfare_target_detail],
        'welfare_crit': [welfare_crit],
        'welfare_service_content': [welfare_service_content],
        'welfare_howto': [welfare_howto],
        'welfare_contact': [welfare_contact],
        'welfare_phone': [welfare_phone],
        'welfare_site_name': [welfare_site_name],
        'welfare_site_link': [welfare_site_link],
        'welfare_purpose': [welfare_purpose],
        'welfare_family': [welfare_family],
        'welfare_target': [welfare_target],
        'welfare_life': [welfare_life],
    })
    welfare_list.append(welfare)

resultSet = pd.concat(welfare_list)
file_name = 'welfare.csv'
resultSet.to_csv('C:/Users/SSAFY/Desktop/Savior/data-preprocessing/' + file_name, index=False, encoding='utf-8-sig')
print('구문 분석 완료')