from django.contrib import admin
from django.urls import path, include
from tasks.views import google_login, google_callback


urlpatterns = [
    path('admin/', admin.site.urls),
    # Google OAuth
    path('auth/google/login/', google_login),
    path('auth/google/callback/', google_callback),
    #Task APIs
    path('api/', include('tasks.urls')),
]
