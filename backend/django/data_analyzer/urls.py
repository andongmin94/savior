from django.urls import path
from . import views

app_name = 'data_analyzer'
urlpatterns = [
    path('', views.index, name='index'),
    path('data/save', views.save_data),
    path('data/dbscan', views.dbscan),
    path('data/grouping', views.cosine_grouping),
]