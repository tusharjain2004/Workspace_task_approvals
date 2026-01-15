# from django.shortcuts import render

# # Create your views here.
# from django.conf import settings
# from django.shortcuts import redirect
# import requests

# from .models import User


# def google_login(request):
#     url = (
#         "https://accounts.google.com/o/oauth2/v2/auth"
#         "?response_type=code"
#         f"&client_id={settings.GOOGLE_CLIENT_ID}"
#         "&scope=openid email profile https://www.googleapis.com/auth/calendar "
#         "https://www.googleapis.com/auth/drive"
#         "&redirect_uri=http://localhost:8000/auth/google/callback/"
#         "&access_type=offline&prompt=consent"
#     )
#     return redirect(url)



# def google_callback(request):
#     code = request.GET.get('code')

#     token_res = requests.post(
#         "https://oauth2.googleapis.com/token",
#         data={
#             "client_id": settings.GOOGLE_CLIENT_ID,
#             "client_secret": settings.GOOGLE_CLIENT_SECRET,
#             "code": code,
#             "grant_type": "authorization_code",
#             "redirect_uri": "http://localhost:8000/auth/google/callback/"
#         }
#     ).json()

#     access_token = token_res['access_token']
#     refresh_token = token_res.get('refresh_token')

#     user_info = requests.get(
#         "https://www.googleapis.com/oauth2/v2/userinfo",
#         headers={"Authorization": f"Bearer {access_token}"}
#     ).json()

#     user, _ = User.objects.update_or_create(
#         email=user_info['email'],
#         defaults={
#             "name": user_info['name'],
#             "google_id": user_info['id'],
#             "access_token": access_token,
#             "refresh_token": refresh_token,
#         }
#     )

#     return redirect("http://localhost:3000/dashboard")




import tempfile
import os

from django.shortcuts import redirect
from django.conf import settings

from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action    #for custom actions -- approve/reject
from rest_framework.response import Response  #return json instead of html
from rest_framework import status   #for standard http status codes ex. 200, 201, 404

from .models import Task, User
from .serializers import TaskSerializer

# Google services
from .services.google_oauth import exchange_code_for_token, get_google_user_info
from .services.google_chat import send_google_chat_message
from .services.google_calendar import create_calendar_event
from .services.google_drive import upload_file_to_drive

def google_login(request):
    google_auth_url = (
        "https://accounts.google.com/o/oauth2/v2/auth"
        "?response_type=code"
        f"&client_id={settings.GOOGLE_CLIENT_ID}"
        "&scope=openid email profile "
        "https://www.googleapis.com/auth/calendar "
        "https://www.googleapis.com/auth/drive"
        "&redirect_uri=http://localhost:8000/auth/google/callback/"
        "&access_type=offline&prompt=consent"
    )

    return redirect(google_auth_url)

def google_callback(request):
    code = request.GET.get("code")

    # Exchange code for tokens
    token_data = exchange_code_for_token(code)
    access_token = token_data["access_token"]
    refresh_token = token_data.get("refresh_token")

    # Get user profile
    user_info = get_google_user_info(access_token)

    # Save / update user
    user, _ = User.objects.update_or_create(
        email=user_info["email"],
        defaults={
            "name": user_info["name"],
            "google_id": user_info["id"],
            "access_token": access_token,
            "refresh_token": refresh_token,
        }
    )

    # Redirect to frontend
    return redirect("http://localhost:5173/dashboard")

class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


    def create(self, request, *args, **kwargs):
        data = request.data

        creator = User.objects.get(id=data["created_by"])
        approver = User.objects.get(id=data["assigned_to"])

        # Create task
        task = Task.objects.create(
            title=data["title"],
            description=data["description"],
            created_by=creator,
            assigned_to=approver,
            due_date=data["due_date"],
        )

        # Upload file to Drive (optional)
        # if "file_path" in data:
        #     file_id = upload_file_to_drive(
        #         creator,
        #         data["file_path"],
        #         "task_attachment"
        #     )
        #     task.drive_file_id = file_id
        #     task.save()
        
        # if getattr(settings, "ENABLE_GOOGLE_DRIVE", False) and "file_path" in data:
        #   try:
        #       file_id = upload_file_to_drive(
        #           creator,
        #           data["file_path"],
        #           "task_attachment"
        #       )
        #       task.drive_file_id = file_id
        #       task.save()
        #   except Exception as e:
        #       print("Google Drive error:", e)


        if getattr(settings, "ENABLE_GOOGLE_DRIVE", False) and request.FILES.get("file"):
          try:
            uploaded_file = request.FILES["file"]

            # Create a cross-platform temporary file
            with tempfile.NamedTemporaryFile(delete=False) as temp:
                for chunk in uploaded_file.chunks():
                    temp.write(chunk)
                temp_path = temp.name

            # Upload to Google Drive
            file_id = upload_file_to_drive(
                creator,
                temp_path,
                uploaded_file.name
            )

            # Save Drive file ID
            task.drive_file_id = file_id
            task.save()

            # Cleanup temp file
            os.remove(temp_path)

          except Exception as e:
            print("Google Drive upload failed:", e)

        
        # Notify approver on Google Chat
        # send_google_chat_message(
        #     f"New task pending approval:\n{task.title}"
        # )
        if getattr(settings, "ENABLE_GOOGLE_CHAT", False):
          try:
            send_google_chat_message(
              f"New task pending approval:\n{task.title}"
            )
          except Exception as e:
            print("Google Chat error:", e)

        

        serializer = TaskSerializer(task)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


    @action(detail=True, methods=["PATCH"])
    def approve(self, request, pk=None):
        task = self.get_object()

        if task.status != "PENDING":
          return Response(
          {"error": "Task already processed"},
          status=status.HTTP_400_BAD_REQUEST
          )

        # Update status
        task.status = "APPROVED"

        # Create calendar event
        # event_id = create_calendar_event(task.assigned_to, task)
        try:
          event_id = create_calendar_event(task.assigned_to, task)
          task.calendar_event_id = event_id
        except Exception as e:
          print("Calendar error:", e)

        task.calendar_event_id = event_id
        task.save()

        return Response(
          {"message": "Task approved and calendar event created"},
          status=status.HTTP_200_OK
        )


    @action(detail=True, methods=["PATCH"])
    def reject(self, request, pk=None):
        task = self.get_object()

        if task.status != "PENDING":
          return Response(
            {"error": "Task already processed"},
            status=status.HTTP_400_BAD_REQUEST
          )

        task.status = "REJECTED"
        task.save()

        return Response(
          {"message": "Task rejected"},
          status=status.HTTP_200_OK
        )
