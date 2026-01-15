import requests
from django.conf import settings


def exchange_code_for_token(code):
    """
    Exchange authorization code for access + refresh token
    """
    token_url = "https://oauth2.googleapis.com/token"

    data = {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "client_secret": settings.GOOGLE_CLIENT_SECRET,
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": "http://localhost:8000/auth/google/callback/",
    }

    response = requests.post(token_url, data=data)
    response.raise_for_status()
    return response.json()


def get_google_user_info(access_token):
    """
    Fetch user profile from Google
    """
    userinfo_url = "https://www.googleapis.com/oauth2/v2/userinfo"

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    response = requests.get(userinfo_url, headers=headers)
    response.raise_for_status()
    return response.json()
