# project/urls.py (main URL configuration)


from django.urls import path
from . import views

urlpatterns = [
    path('', views.task_page, name='task_page'),
    path('update-task/<int:task_id>/', views.update_task, name='update-task'),
    path('delete-task/<int:task_id>/', views.delete_task, name='delete-task'),
]
