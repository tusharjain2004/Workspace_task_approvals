# from googleapiclient.discovery import build   #build() creates a Google API service client
# from googleapiclient.http import MediaFileUpload
# from google.oauth2.credentials import Credentials
# from django.conf import settings   #to fetch id and secret from settings.py


# def upload_file_to_drive(user, file_path, filename):
#     """
#     Upload a file to Google Drive and return file ID
#     """
#     creds = Credentials(
#         token=user.access_token,
#         refresh_token=user.refresh_token,
#         token_uri="https://oauth2.googleapis.com/token",
#         client_id=settings.GOOGLE_CLIENT_ID,
#         client_secret=settings.GOOGLE_CLIENT_SECRET,
#     )

#     service = build("drive", "v3", credentials=creds)

#     file_metadata = {
#         "name": filename
#     }

#     media = MediaFileUpload(file_path, resumable=True)

#     file = service.files().create(
#         body=file_metadata,
#         media_body=media,
#         fields="id"
#     ).execute()

#     return file["id"]



from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google.oauth2.credentials import Credentials

def upload_file_to_drive(user, file_path, file_name):
    creds = Credentials(
        token=user.access_token,
        refresh_token=user.refresh_token,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=None,
        client_secret=None,
    )

    service = build("drive", "v3", credentials=creds)

    file_metadata = {
        "name": file_name
    }

    media = MediaFileUpload(file_path, resumable=True)

    file = service.files().create(
        body=file_metadata,
        media_body=media,
        fields="id"
    ).execute()

    return file.get("id")
