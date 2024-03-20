import pandas as pd

welfarepurpose = []
welfare_dic = {
    '학생': 0,
    '무직': 1,
    '창업': 2,
    '농어업인': 3,
    '중소기업': 4,
    '일반': 5,
    '0': '0',
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5
}

csv_file = pd.read_csv('D:/ssafy/[작업]특화PJT/전체데이터_통합+대상+사업목적데이터.csv', encoding='CP949')
l = csv_file.shape[0]
for i in range(1, l):
    row = csv_file.iloc[i].loc['welfare_target']
    row_id = csv_file.iloc[i].loc['welfare_id']
    try:
        arr = row.split(",")
        for j in range(len(arr)):
            t = (arr[j].strip())
            print(t)
            target = welfare_dic[t]
            print(target)
            welfare = pd.DataFrame({
                'welfaretarget_welfare_id': [row_id],
                'welfaretarget_target_id': [target],
            })
            welfarepurpose.append(welfare)
    except:
        print(i, "번째 줄 error")

resultSet = pd.concat(welfarepurpose)
file_name = 'welfaretarget2.csv'
resultSet.to_csv('D:/ssafy/[작업]특화PJT/' + file_name, index=False, encoding='utf-8-sig')
print(file_name, '완료')
