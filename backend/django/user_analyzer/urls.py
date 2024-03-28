from django.urls import path
from . import views

app_name = 'user_analyzer'
urlpatterns = [
    path('user/inser_dbscan/all', views.insert_all, name='add_all_users'),
    path('user/insert_dbscan/<int:user_seq>', views.insert_user, name='add_user'),
]
