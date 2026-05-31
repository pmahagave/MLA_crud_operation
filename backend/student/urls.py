from django.urls import path
from . import views

urlpatterns = [
    path('api/students/', views.student_list, name='student_list'),
    path('api/students/<int:id>/', views.student_detail, name='student_detail'),
]