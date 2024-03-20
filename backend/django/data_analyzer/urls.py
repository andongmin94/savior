from django.urls import path
from . import views

app_name = 'data_analyzer'
urlpatterns = [
    path('', views.index, name='index'),
]