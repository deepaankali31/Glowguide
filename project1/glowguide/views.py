from django.shortcuts import render

def about(request):
    return render(request, 'glowguide/about.html')

def analytics(request):
    return render(request, 'glowguide/analytics.html')

def chat(request):
    return render(request, 'glowguide/chat.html')

def dashboard(request):
    return render(request, 'glowguide/dashboard.html')

def feedback(request):
    return render(request, 'glowguide/feedback.html')

def habit(request):
    return render(request, 'glowguide/habit.html')

def index(request):
    return render(request, 'glowguide/index.html')

def login(request):
    return render(request, 'glowguide/login.html')

def reels(request):
    return render(request, 'glowguide/reels.html')

def routine(request):
    return render(request, 'glowguide/routine.html')

def signup(request):
    return render(request, 'glowguide/signup.html')