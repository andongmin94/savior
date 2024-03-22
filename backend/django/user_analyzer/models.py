from django.db import models


# Create your models here.

class Comment(models.Model):
    comment_id = models.BigIntegerField(primary_key=True)
    comment_content = models.TextField()
    comment_created_at = models.DateTimeField(blank=True, null=True)
    comment_updated_at = models.DateTimeField(blank=True, null=True)
    comment_qna = models.ForeignKey('Qna', models.DO_NOTHING, blank=True, null=True)
    comment_user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'comment'


class Family(models.Model):
    family_id = models.BigIntegerField(primary_key=True)
    family_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'family'


class FamilyWelfarefamily(models.Model):
    family_family = models.ForeignKey(Family, models.DO_NOTHING)
    welfarefamily = models.OneToOneField('Welfarefamily', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'family_welfarefamily'


class HibernateSequence(models.Model):
    next_val = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'hibernate_sequence'


class Keyword(models.Model):
    keyword_id = models.BigAutoField(primary_key=True)
    keyword_cnt = models.BigIntegerField(blank=True, null=True)
    keyword_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'keyword'


class Life(models.Model):
    age_id = models.BigIntegerField(primary_key=True)
    age_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'life'


class LifeWelfarelife(models.Model):
    life_age = models.ForeignKey(Life, models.DO_NOTHING)
    welfarelife = models.OneToOneField('Welfarelife', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'life_welfarelife'


class Likewelfare(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_seq = models.ForeignKey('User', models.DO_NOTHING, db_column='user_seq')
    welfare = models.ForeignKey('Welfare', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'likewelfare'


class Qna(models.Model):
    qna_id = models.BigIntegerField(primary_key=True)
    qna_content = models.TextField()
    qna_created_at = models.DateTimeField(blank=True, null=True)
    qna_title = models.CharField(max_length=100, blank=True, null=True)
    qna_updated_at = models.DateTimeField(blank=True, null=True)
    qna_user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'qna'


class Selectfamily(models.Model):
    id = models.BigAutoField(primary_key=True)
    family = models.ForeignKey(Family, models.DO_NOTHING, blank=True, null=True)
    user_seq = models.ForeignKey('User', models.DO_NOTHING, db_column='user_seq', blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'selectfamily'


class Selecttarget(models.Model):
    id = models.BigAutoField(primary_key=True)
    target = models.ForeignKey('Target', models.DO_NOTHING, blank=True, null=True)
    user_seq = models.ForeignKey('User', models.DO_NOTHING, db_column='user_seq', blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'selecttarget'


class Target(models.Model):
    target_id = models.BigIntegerField(primary_key=True)
    target_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'target'


class TargetWelfaretarget(models.Model):
    target_target = models.ForeignKey(Target, models.DO_NOTHING)
    welfaretarget = models.OneToOneField('Welfaretarget', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'target_welfaretarget'


class Used(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_seq = models.ForeignKey('User', models.DO_NOTHING, db_column='user_seq')
    welfare = models.ForeignKey('Welfare', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'used'


class User(models.Model):
    user_seq = models.BigAutoField(primary_key=True)
    age = models.CharField(max_length=255, blank=True, null=True)
    birth = models.CharField(max_length=255, blank=True, null=True)
    child = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    female = models.BigIntegerField(blank=True, null=True)
    male = models.BigIntegerField(blank=True, null=True)
    modified_at = models.DateTimeField(blank=True, null=True)
    password = models.CharField(max_length=128, blank=True, null=True)
    profile_image_url = models.CharField(max_length=512, blank=True, null=True)
    provider_type = models.CharField(max_length=20, blank=True, null=True)
    role_type = models.CharField(max_length=20, blank=True, null=True)
    user_group = models.BigIntegerField(blank=True, null=True)
    user_id = models.CharField(unique=True, max_length=64)
    username = models.CharField(max_length=100)

    class Meta:
        managed = True
        db_table = 'user'


class UserRefreshToken(models.Model):
    refresh_token_seq = models.BigAutoField(primary_key=True)
    refresh_token = models.CharField(max_length=256)
    user_id = models.CharField(unique=True, max_length=64)

    class Meta:
        managed = False
        db_table = 'user_refresh_token'


class Welfare(models.Model):
    welfare_id = models.BigIntegerField(primary_key=True)
    welfare_ori_id = models.CharField(max_length=255, blank=True, null=True)
    welfare_child = models.IntegerField(blank=True, null=True)
    welfare_contact = models.CharField(max_length=255, blank=True, null=True)
    welfare_crit = models.TextField(blank=True, null=True)
    welfare_date = models.TextField(blank=True, null=True)
    welfare_dept_name = models.CharField(max_length=255, blank=True, null=True)
    welfare_female = models.BigIntegerField(blank=True, null=True)
    welfare_group = models.BigIntegerField(blank=True, null=True)
    welfare_howto = models.TextField(blank=True, null=True)
    welfare_male = models.BigIntegerField(blank=True, null=True)
    welfare_phone = models.CharField(max_length=255, blank=True, null=True)
    welfare_service_content = models.TextField(blank=True, null=True)
    welfare_service_name = models.CharField(max_length=255, blank=True, null=True)
    welfare_service_purpose = models.TextField(blank=True, null=True)
    welfare_service_type = models.CharField(max_length=255, blank=True, null=True)
    welfare_similar_welfare = models.CharField(max_length=255, blank=True, null=True)
    welfare_site_link = models.CharField(max_length=255, blank=True, null=True)
    welfare_site_name = models.CharField(max_length=255, blank=True, null=True)
    welfare_target_detail = models.TextField(blank=True, null=True)
    welfare_view = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'welfare'


class Welfarefamily(models.Model):
    id = models.BigAutoField(primary_key=True)
    family = models.ForeignKey(Family, models.DO_NOTHING, blank=True, null=True)
    welfare = models.ForeignKey(Welfare, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'welfarefamily'


class Welfarelife(models.Model):
    id = models.BigAutoField(primary_key=True)
    life = models.ForeignKey(Life, models.DO_NOTHING, blank=True, null=True)
    welfare = models.ForeignKey(Welfare, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'welfarelife'


class Welfaretarget(models.Model):
    id = models.BigAutoField(primary_key=True)
    target = models.ForeignKey(Target, models.DO_NOTHING, blank=True, null=True)
    welfare = models.ForeignKey(Welfare, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'welfaretarget'
