from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from django.conf import settings


def create_calendar_event(user, task):
    """
    Create a Google Calendar event when task is approved
    """
    creds = Credentials(
        token=user.access_token,
        refresh_token=user.refresh_token,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=settings.GOOGLE_CLIENT_ID,
        client_secret=settings.GOOGLE_CLIENT_SECRET,
    )

    service = build("calendar", "v3", credentials=creds)

    event = {
        "summary": task.title,
        "description": task.description,
        "start": {
            "dateTime": task.due_date.isoformat(),
            "timeZone": "Asia/Kolkata",
        },
        "end": {
            "dateTime": task.due_date.isoformat(),
            "timeZone": "Asia/Kolkata",
        },
    }

    created_event = service.events().insert(
        calendarId="primary",
        body=event
    ).execute()

    return created_event["id"]
