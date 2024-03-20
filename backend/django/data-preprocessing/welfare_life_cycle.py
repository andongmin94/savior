import pandas as pd

# 파일에 저장
welfarelife = []
welfare_dic = {
    '영유아': 0,
    '아동': 1,
    '청소년': 2,
    '청년': 3,
    '중장년': 4,
    '노년': 5,
    '0': '0',
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6, }

csv_file = pd.read_csv('D:/ssafy/[작업]특화PJT/전체데이터_통합+대상+사업목적데이터.csv', encoding='CP949')
l = csv_file.shape[0]
for i in range(1, l):
    row = csv_file.iloc[i].loc['welfare_life']
    row_id = csv_file.iloc[i].loc['welfare_id']
    try:
        arr = row.split(",")
        for j in range(len(arr)):
            t = (arr[j].strip())
            print(t)
            target = welfare_dic[t]
            print(target)
            welfare = pd.DataFrame({
                'welfarelife_welfare_id': [row_id],
                'welfarelife_life_id': [target],
            })
            welfarelife.append(welfare)
    except:
        print(i, "번째 줄 error")

resultSet = pd.concat(welfarelife)
file_name = 'welfarelife.csv'
resultSet.to_csv('D:/ssafy/[작업]특화PJT/' + file_name, index=False, encoding='utf-8-sig')
print(file_name, '완료')
