"""
URL configuration for glowguide app.

Routes URLs to views for the glowguide application.
"""
from django.urls import path
from . import views

app_name = 'glowguide'

urlpatterns = [
    path('', views.index, name='index'),
    path('analytics/', views.analytics, name='analytics'),
    path('chat/', views.chat, name='chat'),
    path('about/', views.about, name='about'),
    path('feedback/', views.feedback, name='feedback'),
    path('habit/', views.habit, name='habit'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('login/', views.login, name='login'),
    path('reels/', views.reels, name='reels'),
    path('routine/', views.routine, name='routine'),
    path('signup/', views.signup, name='signup'),
]