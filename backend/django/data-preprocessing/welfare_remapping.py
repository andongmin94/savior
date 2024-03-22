import pandas as pd

welfarelife = []
welfare_id_dic = {}

csv_file = pd.read_csv('D:/ssafy/[작업]특화PJT/pythondata/220324 전체데이터 번호재정의와 정렬.csv', encoding='CP949')
l = csv_file.shape[0]

for i in range(0, l):
    row_id = csv_file.iloc[i].loc['welfare_id']
    row_ori_id = csv_file.iloc[i].loc['welfare_ori_id']
    try:
        welfare_id_dic[row_ori_id] = row_id
    except:
        print(i, "번째 줄 error")

print(welfare_id_dic)

file_path = 'D:/ssafy/[작업]특화PJT/pythondata/'
file_list = ['220324 welfarefamily 정렬', '220324 welfarelife 정렬', '220324 welfarepurpose 정렬', '220324 welfaretarget 정렬',
             'used2']
id_name = ['welfarefamily_welfare_id', 'welfarelife_welfare_id', 'welfarepurpose_welfare_id',
           'welfaretarget_welfare_id', 'used_welfare_id']
for i in range(len(file_list)):
    result = []
    welfare_csv_file = pd.read_csv(file_path + file_list[i] + ".csv", encoding='CP949')
    l = welfare_csv_file.shape[0]
    for j in range(0, l):
        cur_ori_id = welfare_csv_file.iloc[j].loc[id_name[i]]
        result.append(welfare_id_dic[cur_ori_id])
        try:
            welfare_id_dic[row_ori_id] = row_id
        except:
            print(i, "번째 줄 error")
    print(result)
    welfare_csv_file['welfare_id'] = result
    welfare_csv_file.to_csv(file_path + str(i) + ".csv", index=False, encoding='utf-8-sig')
    print(file_list[i], " 끝")
