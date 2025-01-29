"""
URL configuration for Sathi project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path 
from myapp import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home_page'),
    path('register/', views.register, name='register_page'),
    path('login/', views.login_view, name='login_page'),
    path('about/', views.about, name='about_page'),
    path('add-task/', views.task, name='task_page'), 
    path('forgot-password/', views.forgot_password_view, name='forgot_password_page'),
    path('task/update/<int:task_id>/', views.update_task, name='update-task'),
    path('task/delete/<int:task_id>/', views.delete_task, name='delete-task'),
     path('logout/', views.logout, name='logout'),
]



