from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.contrib import messages
from django.views import View
from .models import Task





# Create your views here.

def home(request):
    return render(request, 'home.html')

def login_view(request):
    if request.method=='POST':
        username=request.POST['username']  
        password=request.POST['password']
        user = authenticate(request, 
            username=username, password=password
        )
        if user is not None:
            login(request, user)
            return render(request, 'task.html')
        else:
            messages.error(request, 'Invalid Username or Password')
            return render(request, 'login.html')
    
    return render(request, 'login.html')


def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        email_id = request.POST['email_id']
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']

        if confirm_password == password:
            new_user = User.objects.create_user(
                username, email_id, password
            )
            new_user.save()
            messages.success(request, 'Registeration Successfull!')
            return render(request, 'login.html')
        else:
            messages.error(request, 'Passwords are not matched!')
            return render(request, 'register.html')

    return render(request, 'register.html')

def forgot_password_view(request):
    return render(request, 'forget.html')

def logout(request):
    if request.method == 'POST':
        logout(request)
        messages.succes(request,"Sucessfully logged out")
        return render(request, 'login.html')
        
def about(request):
    return render(request, 'know_more.html')

#task

def task(request):
    if request.method == 'POST':
        # Add logic to save the task
        title = request.POST.get("title")
        start_time = request.POST.get('start_alarm')
        end_time = request.POST.get('end_alarm')
        Task.objects.create(title=title, start_time=start_time, end_time=end_time)
        return render(request, 'task.html', {'tasks': task_list()})
    return render(request, 'task.html', {'tasks': task_list()}) 

# List all tasks
def task_list():
    return Task.objects.all()

from django.shortcuts import get_object_or_404, redirect
from django.http import Http404

# Update a task
def update_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)
    
    if request.method == 'POST':
        task.title = request.POST.get("title")
        task.description = request.POST.get('description')
        task.status = request.POST.get('status', 'pending')
         # Check if 'status' is missing or empty
        task.status = 'staus'  # Set a default status if necessary
        
        task.save()
        return render(request, 'task.html', {'tasks': task_list()}) # Change 'task_list' to your task list view name
    
    return render(request, 'task.html', {'task': task})

# Delete a task
def delete_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)
    
    if request.method == 'POST':
        task.delete()
        return render(request, 'task.html', {'tasks': task_list()}) # Change 'task_list' to your task list view name

    return render(request, 'task.html', {'task': task})

from django.shortcuts import render, redirect, get_object_or_404
from .models import Task
from .forms import TaskForm

def task_page(request):
    tasks = Task.objects.all()
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('task_page')
    else:
        form = TaskForm()
    
    return render(request, 'task_page.html', {'tasks': tasks, 'form': form})

def update_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)
    if request.method == 'POST':
        task.status = request.POST.get('status')
        task.title = request.POST.get('title')
        task.start_time = request.POST.get('start_alarm')
        task.end_time = request.POST.get('end_alarm')
        task.save()
        return redirect('task_page')
    return render(request, 'task_page.html')

def delete_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)
    task.delete()
    return redirect('task_page')










    
