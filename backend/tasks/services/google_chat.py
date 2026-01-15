import requests
from django.conf import settings


def send_google_chat_message(message):
    """
    Send a message to Google Chat via webhook
    """
    payload = {
        "text": message
    }

    response = requests.post(
        settings.GOOGLE_CHAT_WEBHOOK_URL,
        json=payload
    )

    response.raise_for_status()
