import pandas as pd

welfarefamily = []
welfare_dic = {
    '무주택자': 0,
    '임산부': 1,
    '미취학': 2,
    '다문화·탈북민': 3,
    '다자녀': 4,
    '보훈대상자': 5,
    '장애인': 6,
    '저소득': 7,
    '한부모·조손': 8,
    '신용불량자': 9,
    '독거노인': 10,
    '취약계층': 11,
    '0': '0',
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    '11': 11,
    '12': 12
}

csv_file = pd.read_csv('D:/ssafy/[작업]특화PJT/전체데이터_통합+대상+사업목적데이터.csv', encoding='CP949')
l = csv_file.shape[0]
for i in range(1, l):
    row = csv_file.iloc[i].loc['welfare_family']
    row_id = csv_file.iloc[i].loc['welfare_id']
    try:
        arr = row.split(",")
        for j in range(len(arr)):
            t = (arr[j].strip())
            print(t)
            target = welfare_dic[t]
            print(target)
            welfare = pd.DataFrame({
                'welfarefamily_welfare_id': [row_id],
                'welfarefamily_family_id': [target],
            })
            welfarefamily.append(welfare)
    except:
        print(i, "번째 줄 error")

resultSet = pd.concat(welfarefamily)
file_name = 'welfarefamily.csv'
resultSet.to_csv('D:/ssafy/[작업]특화PJT/' + file_name, index=False, encoding='utf-8-sig')
print(file_name, '완료')
