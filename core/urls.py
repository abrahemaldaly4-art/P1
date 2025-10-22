from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('about/', views.about_view, name='about'),
    path('contact/', views.contact_view, name='contact'),
    path('articles/', views.articles_view, name='articles'),
    path('categories/', views.categories_view, name='categories'),
    path('contact/', views.contact_view, name='contact'),
]
