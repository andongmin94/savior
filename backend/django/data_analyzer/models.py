from django.db import models


# Create your models here.

class Family(models.Model):
    family_id = models.BigIntegerField(primary_key=True)
    family_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'family'


class Life(models.Model):
    age_id = models.BigIntegerField(primary_key=True)
    age_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'life'


# class Purpose(models.Model):
#     purpose_id = models.BigIntegerField(primary_key=True)
#     purpose_name = models.CharField(max_length=50, blank=True, null=True)

#     class Meta:
#         managed = True
#         db_table = 'purpose'


class Target(models.Model):
    target_id = models.BigIntegerField(primary_key=True)
    target_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'target'


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
        managed = True
        db_table = 'welfare'


class Welfarefamily(models.Model):
    id = models.BigAutoField(primary_key=True)
    family_id = models.IntegerField(blank=True, null=True)
    welfare_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'welfarefamily'


class Welfarelife(models.Model):
    id = models.BigAutoField(primary_key=True)
    life_id = models.IntegerField(blank=True, null=True)
    welfare_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'welfarelife'


# class Welfarepurpose(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     purpose_id = models.IntegerField(blank=True, null=True)
#     welfare_id = models.IntegerField(blank=True, null=True)

#     class Meta:
#         managed = True
#         db_table = 'welfarepurpose'


class Welfaretarget(models.Model):
    id = models.BigAutoField(primary_key=True)
    target_id = models.IntegerField(blank=True, null=True)
    welfare_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'welfaretarget'


class Welfare_similarwelfare(models.Model):
    welfare_welfare_id = models.BigIntegerField(primary_key=True)
    similarwelfare_welfare_id = models.BigIntegerField

    class Meta:
        managed = True
        db_table = 'similarwelfare'


class WelfareApp(models.Model):
    app_version = models.CharField(max_length=255, unique=True)
    file = models.FileField(upload_to='welfare_app/')

    class Meta:
        managed = True
        db_table = 'welfare_app'
