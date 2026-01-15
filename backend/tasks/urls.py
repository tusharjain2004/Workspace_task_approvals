from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet

# DRF router for Task APIs
router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='tasks')

urlpatterns = [
    # Task APIs
    path('', include(router.urls)),
]
