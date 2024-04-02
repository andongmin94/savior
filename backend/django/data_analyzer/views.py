import json
import os
import re

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from konlpy.tag import Okt
import numpy as np
import pandas as pd
from rest_framework.decorators import api_view
from rest_framework.response import Response
from scipy.sparse import csr_matrix
from sklearn.cluster import DBSCAN
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from .models import *


# Create your views here.
@api_view(['GET'])
def index(request):
    return render(request, 'data_analyzer/index.html')


# 출력 경로
file_path = os.getcwd() + "/data-preprocessing/result/"


# 복지 데이터
@api_view(['GET'])
def save_data(request):
    file_name = "220404 행안부 공공서비스_openapi.json"
    with open(file_path + file_name, "r", encoding='UTF8') as json_file:
        json_data = json.load(json_file)
        welfares = []
        for i in json_data:
            welfare = Welfare()
            welfare.welfare_id = i['welfare_id']
            welfare.welfare_ori_id = i['welfare_ori_id']
            welfare.welfare_service_name = i['welfare_service_name']
            welfare.welfare_dept_name = i['welfare_dept_name']
            welfare.welfare_target_detail = i['welfare_target_detail']
            welfare.welfare_crit = i['welfare_crit']
            welfare.welfare_service_content = i['welfare_service_content']
            welfare.welfare_howto = i['welfare_howto']
            welfare.welfare_phone = i['welfare_phone']
            welfare.welfare_site_name = i['welfare_site_name']
            welfare.welfare_site_link = i['welfare_site_link']
            welfare.welfare_child = i['welfare_child']
            welfare.welfare_contact = i['welfare_contact']
            welfare.welfare_service_type = i['welfare_service_type']
            welfare.welfare_service_purpose = i['welfare_service_purpose']
            welfare.welfare_date = i['welfare_date']
            welfare.welfare_view = i['welfare_view']
            welfare.welfare_female = i['welfare_female']
            welfare.welfare_male = i['welfare_male']
            # welfare_name
            # welfare_group
            welfares.append(welfare)
        Welfare.objects.bulk_create(welfares)

    # 생애주기 데이터
    file_name = "age.csv"
    csv_life = pd.read_csv(file_path + file_name, encoding='cp949')

    lifes = []

    for i in range(len(csv_life)):
        row = csv_life.iloc[i]

        life = Life()
        life.age_id = row['age_id']
        life.age_name = row['age_name']

        lifes.append(life)

    Life.objects.bulk_create(lifes)

    # 가구특성 데이터
    file_name = "family.csv"
    csv_family = pd.read_csv(file_path + file_name, encoding='cp949')

    families = []

    for i in range(len(csv_family)):
        row = csv_family.iloc[i]

        family = Family()
        family.family_id = row['family_id']
        family.family_name = row['family_name']

        families.append(family)

    Family.objects.bulk_create(families)

    # 대상특성 데이터
    file_name = "target.csv"
    csv_target = pd.read_csv(file_path + file_name, encoding='cp949')

    targets = []

    for i in range(len(csv_target)):
        row = csv_target.iloc[i]

        target = Target()
        target.target_id = row['target_id']
        target.target_name = row['target_name']

        targets.append(target)

    Target.objects.bulk_create(targets)

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
        welfare_life.welfare_id = row['癤퓑elfare_id']
        welfare_life.life_id = life_id

        welfare_lifes.append(welfare_life)

    Welfarelife.objects.bulk_create(welfare_lifes)

    # 복지-가구특성 데이터
    file_name = "220404 행안부 welfarefamily.csv"
    csv_welfarefamily = pd.read_csv(file_path + file_name, encoding='cp949')
    welfare_families = []

    for i in range(len(csv_welfarefamily)):
        row = csv_welfarefamily.iloc[i]

        welfare_family = Welfarefamily()

        welfare_family.welfare_id = row['癤퓑elfare_id']
        welfare_family.family_id = row['welfarefamily_family_id']

        welfare_families.append(welfare_family)

    Welfarefamily.objects.bulk_create(welfare_families)

    # 복지-대상특성 데이터
    file_name = "220404 행안부 welfaretarget.csv"
    csv_welfaretarget = pd.read_csv(file_path + file_name, encoding='cp949')

    welfare_targets = []

    for i in range(len(csv_welfaretarget)):
        row = csv_welfaretarget.iloc[i]

        welfare_target = Welfaretarget()
        welfare_target.welfare_id = row['癤퓑elfare_id']
        welfare_target.target_id = row['welfaretarget_target_id']
        welfare_targets.append(welfare_target)

    Welfaretarget.objects.bulk_create(welfare_targets)

    return Response("success")


# 복지 데이터 분류
def classify_words():
    total = []

    # 모델의 모든 레코드를 조회하여 변수에 할당
    welfare = Welfare.objects.all()
    family = Welfarefamily.objects.all()
    life = Welfarelife.objects.all()
    target = Welfaretarget.objects.all()

    # 상세 조건 분석
    for j in range(len(welfare)):
        age09 = "@"
        age1019 = "@"
        age2029 = "@"
        age3039 = "@"
        age60 = "@"
        student = "@"
        inoccupation = "@"
        startup = "@"
        farmerfisherman = "@"
        smallcompony = "@"
        job_defalut = "@"
        child_ok = "@"
        child_empty = "@"
        female = '@'
        male = '@'
        not_have_house = "@"
        pregnant = "@"
        alone = "@"
        other_culture = "@"
        many_child = "@"
        national_merit = "@"
        disabled = "@"
        new = "@"
        single_parent = "@"
        many_family = "@"
        alone_old_man = "@"
        vulnerable = "@"
        none_of_them = "@"

        # 초기 값 설정
        w = welfare[j]  # 복지 혜택 하나
        # temp 시작
        w_id = w.welfare_id
        ori_id = w.welfare_ori_id
        # tmp=cur.iloc[:,2:]
        # row=tmp.iloc[j]
        # len_row=row.count() # column 개수 세기

        if w.welfare_child == 1:
            child_ok = "자녀있음"
        elif w.welfare_child == 2:
            child_empty = "자녀없음/상관없음"
        # 자녀유무 끝
        # temp 데이터 끝

        if w.welfare_female == 1:
            female = "여성"
        if w.welfare_male == 1:
            male = "남성"
        # 자녀유무 끝
        # temp 데이터 끝

        # 가구
        f = family.filter(welfare_id=w_id)
        for nf in f:
            nfi = nf.family_id
            if nfi == 0:
                not_have_house = "무주택자"
            elif nfi == 1:
                pregnant = "임산부"
            elif nfi == 2:
                alone = "1인가구"
            elif nfi == 3:
                other_culture = "다문화/탈북민"
            elif nfi == 4:
                many_child = "다자녀"
            elif nfi == 5:
                national_merit = "보훈대상자/국가유공자"
            elif nfi == 6:
                disabled = "장애인"
            elif nfi == 7:
                new = "신규전입"
            elif nfi == 8:
                single_parent = "한부모/조손"
            elif nfi == 9:
                many_family = "확대가족"
            elif nfi == 10:
                alone_old_man = "요양환자/치매환자"
            elif nfi == 11:
                vulnerable = "취약계층"
            elif nfi == 12:
                none_of_them = "해당없음"

        # 복지 대상
        t = target.filter(welfare_id=w_id)
        for nt in t:
            nti = nt.target_id
            if nti == 0:
                student = "학생"
            elif nti == 1:
                inoccupation = "무직"
            elif nti == 2:
                startup = "창업"
            elif nti == 3:
                farmerfisherman = "농어업인"
            elif nti == 4:
                smallcompony = "중소기업"
            elif nti == 5:
                job_defalut = "일반"

        # 생애주기
        l = life.filter(welfare_id=w_id)
        for nl in l:
            nli = nl.life_id
            if nli == 1:
                age09 = "아동"
            elif nli == 2:
                age1019 = "청소년"
            elif nli == 3:
                age2029 = "청년"
            elif nli == 4:
                age3039 = "중장년"
            elif nli == 5:
                age60 = "노년"
            elif nli == 6:
                age09 = "아동"
                age1019 = "청소년"
                age2029 = "청년"
                age3039 = "중장년"
                age60 = "노년"

        # 데이터 받기 완료

        d = pd.DataFrame({
            '아이디': [w_id],
            'ori_아이디': [ori_id],
            '아동': [age09],
            '청소년': [age1019],
            '청년': [age2029],
            '중장년': [age3039],
            '노년': [age60],
            '학생': [student],
            '무직': [inoccupation],
            '창업': [startup],
            '농어업인': [farmerfisherman],
            '중소기업': [smallcompony],
            '일반': [job_defalut],
            '자녀여부 있음': [child_ok],
            '자녀여부 없음': [child_empty],
            '여성': [female],
            '남성': [male],
            '무주택자': [not_have_house],
            '임산부': [pregnant],
            '1인가구': [alone],
            '다문화/탈북민': [other_culture],
            '다자녀': [many_child],
            '보훈대상자/국가유공자': [national_merit],
            '장애인': [disabled],
            '신규전입': [new],
            '한부모/조손': [single_parent],
            '확대가족': [many_family],
            '요양환자/치매환자': [alone_old_man],
            '취약계층': [vulnerable],
            '해당없음': [none_of_them],
        })
        total.append(d)

    result = pd.concat(total)
    file_name = "welfare_word_result.csv"
    result.to_csv(file_path + file_name, index=False, encoding='utf-8-sig')
    return file_name


# 분류된 복지 특성 단위 벡터화
def vectorize_properties():
    total = []

    welfare = Welfare.objects.all()
    family = Welfarefamily.objects.all()
    life = Welfarelife.objects.all()
    # purpose = Welfarepurpose.objects.all()
    target = Welfaretarget.objects.all()

    family_idx = 0
    target_idx = 0
    age_idx = 0

    for j in range(len(welfare)):
        age09 = 0
        age1019 = 0
        age2029 = 0
        age3039 = 0
        age60 = 0
        student = 0
        inoccupation = 0
        startup = 0
        farmerfisherman = 0
        smallcompony = 0
        job_defalut = 0
        child_ok = 0
        child_empty = 0
        female = 0  # 추가
        male = 0  # 추가
        not_have_house = 0
        pregnant = 0
        alone = 0  # 추가
        other_culture = 0
        many_child = 0
        national_merit = 0
        disabled = 0
        new = 0  # 추가
        single_parent = 0
        many_family = 0  # 추가
        alone_old_man = 0
        vulnerable = 0
        none_of_them = 0  # 가구 특성

        # 초기 값 설정
        w = welfare[j]  # 복지 혜택 하나
        # temp 시작
        w_id = w.welfare_id
        ori_id = w.welfare_ori_id

        if w.welfare_female == 1:
            female = 1
        if w.welfare_male == 1:
            male = 1
        # 성별

        if w.welfare_child == 1:
            child_ok = 1
        elif w.welfare_child == 2:
            child_empty = 1
        # 자녀유무 끝
        # temp 데이터 끝

        f = family.filter(welfare_id=w_id)

        for nf in f:
            nfi = nf.family_id
            if nfi == 0:
                not_have_house = 1
            elif nfi == 1:
                pregnant = 1
            elif nfi == 2:
                alone = 1
            elif nfi == 3:
                other_culture = 1
            elif nfi == 4:
                many_child = 1
            elif nfi == 5:
                national_merit = 1
            elif nfi == 6:
                disabled = 1
            elif nfi == 7:
                new = 1
            elif nfi == 8:
                single_parent = 1
            elif nfi == 9:
                many_family = 1
            elif nfi == 10:
                alone_old_man = 1
            elif nfi == 11:
                vulnerable = 1
            elif nfi == 12:
                none_of_them = 1
        # 가구 끝

        t = target.filter(welfare_id=w_id)

        for nt in t:
            nti = nt.target_id
            if nti == 0:
                student = 1
            elif nti == 1:
                inoccupation = 1
            elif nti == 2:
                startup = 1
            elif nti == 3:
                farmerfisherman = 1
            elif nti == 4:
                smallcompony = 1
            elif nti == 5:
                job_defalut = 1
        # 대상 끝

        l = life.filter(welfare_id=w_id)

        for nl in l:
            nli = nl.life_id
            if nli == 1:
                age09 = 1
            elif nli == 2:
                age1019 = 1
            elif nli == 3:
                age2029 = 1
            elif nli == 4:
                age3039 = 1
            elif nli == 5:
                age60 = 1
            elif nli == 6:
                age09 = age1019 = age2029 = age3039 = age60 = 1
        # 나이 끝

        # 데이터 받기 완료
        d = pd.DataFrame({
            '아이디': [w_id],
            'ori_아이디': [ori_id],
            '아동': [age09],
            '청소년': [age1019],
            '청년': [age2029],
            '중장년': [age3039],
            '노년': [age60],
            '학생': [student],
            '무직': [inoccupation],
            '창업': [startup],
            '농어업인': [farmerfisherman],
            '중소기업': [smallcompony],
            '일반': [job_defalut],
            '자녀여부 있음': [child_ok],
            '자녀여부 없음': [child_empty],
            '여성': [female],
            '남성': [male],
            '무주택자': [not_have_house],
            '임산부': [pregnant],
            '1인가구': [alone],
            '다문화/탈북민': [other_culture],
            '다자녀': [many_child],
            '보훈대상자/국가유공자': [national_merit],
            '장애인': [disabled],
            '신규전입': [new],
            '한부모/조손': [single_parent],
            '확대가족': [many_family],
            '요양환자/치매환자': [alone_old_man],
            '취약계층': [vulnerable],
            '해당없음': [none_of_them],
        })
        total.append(d)

    result = pd.concat(total)
    file_name = "complete.csv"
    result.to_csv(file_path + file_name, index=False, encoding='utf-8-sig')
    return result


# 공공서비스 데이터 병합, 복지 단어 / 불용어 분리
def filter_stopword():
    file_name = classify_words()
    total = pd.read_csv(file_path + file_name)
    data = pd.read_csv(file_path + "220404 행안부 공공서비스_openapi.csv")

    total_split = total.iloc[:, 2:]
    data_split = data.iloc[:, :16]

    result = pd.concat([data_split, total_split], axis=1)

    name_list = [
        '아동',
        '청소년',
        '청년',
        '중장년',
        '노년',
        '학생',
        '무직',
        '창업',
        '농어업인',
        '중소기업',
        '일반',
        '자녀여부 있음',
        '자녀여부 없음',
        '여성',
        '남성',
        '무주택자',
        '임산부',
        '1인가구',
        '다문화/탈북민',
        '다자녀',
        '보훈대상자/국가유공자',
        '장애인',
        '신규전입',
        '한부모/조손',
        '확대가족',
        '요양환자/치매환자',
        '취약계층',
        '해당없음'
    ]

    text = result['welfare_service_name'] + ' ' + result['welfare_target_detail'] + ' ' + result['welfare_crit'] + ' ' + \
           result['welfare_service_content'] + ' ' + result['welfare_service_purpose']

    for i in range(len(name_list)):
        text += ' ' + result[name_list[i]]

    for i in range(len(text)):
        text[i] = re.sub(r'[-=+,#/\?:^$.@*\"※~&%ㆍ!』\\‘|\(\)\[\]\<\>`\'…》\n]', '', str(text[i]))
        text[i] = re.sub('[0-9]', '', str(text[i]))
        text[i] = re.sub('[;▶[]《『』]', '', str(text[i]))
        text[i] = re.sub(r"\s+", "", str(text[i]))  # 스페이스 제거

    okt = Okt()
    sentences_tag = []

    for i in range(0, len(text)):
        morph = okt.pos(text[i])
        sentences_tag.append(morph)

    word_list = []

    for sentence1 in sentences_tag:
        l1 = []
        for word, tag in sentence1:

            if tag in ['Noun']:
                l1.append(word)
        word_list.append(l1)

    with open(file_path + "복지 단어 데이터.txt", 'w') as f:
        for i in range(len(word_list)):
            for line in word_list[i]:
                f.write(line)
                f.write(' ')
            f.write('\n')

    with open(file_path + "복지 단어 데이터.txt", 'r') as f:
        list_file = f.readlines()
    list_file = [line.rstrip('\n') for line in list_file]

    stopwords = []

    file = open(file_path + "불용어.txt", 'r', encoding='UTF8')

    while (1):
        line = file.readline()
        try:
            escape = line.index('\n')
        except:
            escape = len(line)

        if line:
            stopwords.append(line[0:escape])
        else:
            break

    file.close()
    return list_file


# 복지 특성유무에 따른 DBSCAN 클러스터링
@api_view(['GET'])
def dbscan(request):
    ex = classify_words()
    total_word = pd.read_csv(file_path + "welfare_word_result.csv", encoding='utf-8')
    total = vectorize_properties()

    temp = total.iloc[:, 2:]

    model = DBSCAN(min_samples=6)
    labels = model.fit_predict(temp)

    word = total
    word['clustering'] = labels[:]
    word2 = total_word
    word2['clustering'] = labels[:]

    word.to_csv(file_path + "welfare+DBSCAN.csv", encoding='utf-8-sig')
    word2.to_csv(file_path + "welfare_word+DBSCAN.csv", encoding='utf-8-sig')

    # DB에 저장
    welfares = Welfare.objects.all()
    for i in range(len(word)):
        welfare = welfares.filter(welfare_id=word.iloc[i]['아이디'])
        welfare.update(welfare_group=word.iloc[i]['clustering'])

    return Response('DBSCAN done')


# 희소 행렬 csr 변환
def compress_matrix():
    total = vectorize_properties()
    total = total.iloc[:, 2:]
    vector = csr_matrix(total, shape=None, dtype=None, copy=False)
    return vector


# 복지 단어 벡터화(TF-IDF)
def vectorize_words():
    list_file = filter_stopword()
    corpus_welfare = list_file
    tfidfv_welfare = TfidfVectorizer(min_df=5, max_features=150, ngram_range=(1, 3)).fit(list_file)

    welfare = tfidfv_welfare.transform(corpus_welfare).toarray()

    genre_sim = cosine_similarity(welfare, welfare)

    num_welfare = len(welfare)
    genre_sim[range(num_welfare), range(num_welfare)] = 0

    return genre_sim


# 복지 유사도 계산 및 그룹화
@api_view(['GET'])
def cosine_grouping(request):
    sim_word = vectorize_words()
    vector_0101 = compress_matrix()

    sim_0101 = cosine_similarity(vector_0101, vector_0101)

    sim_0101[range(len(sim_0101)), range(len(sim_0101))] = 0

    sim = (sim_0101 + sim_word) / 2

    top_10 = []

    for i in range(len(sim)):
        max_10 = sorted(sim[i], reverse=True)[:10]
        for j in range(10):
            z = 0
            now = np.where(sim[i] == max_10[j])[0][z]
            if j != 0:
                while now in max_10:
                    z += 1
                    now = np.where(sim[i] == max_10[j])[0][z]
            max_10[j] = now
        top_10.append(max_10)

    welfares = Welfare.objects.all()

    for i in range(len(top_10)):
        welfare = welfares.filter(welfare_id=i + 1)
        welfare.update(welfare_similar_welfare=top_10[i])

    return Response('cosine_grouping done')


@csrf_exempt
@api_view(['POST'])
def upload_welfare_app(request):
    if request.method == 'POST':
        app_version = request.POST.get('app_version')
        file = request.FILES.get('file')

        if not file:
            return JsonResponse({'error': 'No file provided.'}, status=400)

        welfare_app, created = WelfareApp.objects.get_or_create(app_version=app_version)
        welfare_app.file = file
        welfare_app.save()

        return JsonResponse({
            'id': welfare_app.id,
            'app_version': welfare_app.app_version,
            'file_url': welfare_app.file.url,
            'created': created  # True면 새로 생성, False면 업데이트
        }, status=201)


@api_view(['GET'])
def download_welfare_app(request, app_version):
    try:
        welfare_app = WelfareApp.objects.get(app_version=app_version)
        file_url = welfare_app.file.url
        return JsonResponse({'url': file_url}, status=200)
    except WelfareApp.DoesNotExist:
        return JsonResponse({'error': 'File not found'}, status=404)
