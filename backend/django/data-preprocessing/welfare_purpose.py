import pandas as pd

welfarepurpose = []
welfare_dic = {
    '일자리': 0,
    '주거': 1,
    '일상생활': 2,
    '신체건강 및 보건의료': 3,
    '정신건강 및 심리정서': 4,
    '보호 및 돌봄·요양': 5,
    '보육 및 교육': 6,
    '문화 및 여가': 7,
    '안전 및 권익보장': 8,
    '해당 없음': 9,
    '0': '0',
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9
}

csv_file = pd.read_csv('D:/ssafy/[작업]특화PJT/전체데이터_통합+대상+사업목적데이터.csv', encoding='CP949')
l = csv_file.shape[0]
for i in range(1, l):
    row = csv_file.iloc[i].loc['welfare_purpose']
    row_id = csv_file.iloc[i].loc['welfare_id']
    try:
        arr = row.split(",")
        for j in range(len(arr)):
            t = (arr[j].strip())
            print(t)
            target = welfare_dic[t]
            print(target)
            welfare = pd.DataFrame({
                'welfarepurpose_welfare_id': [row_id],
                'welfarepurpose_purpose_id': [target],
            })
            welfarepurpose.append(welfare)
    except:
        print(i, "번째 줄 error")

resultSet = pd.concat(welfarepurpose)
file_name = 'welfarepurpose.csv'
resultSet.to_csv('D:/ssafy/[작업]특화PJT/' + file_name, index=False, encoding='utf-8-sig')
print(file_name, '완료')
