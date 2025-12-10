from django.urls import path
from .views_auth import login_view

urlpatterns = [
    path('login/', login_view, name='login'),
]
