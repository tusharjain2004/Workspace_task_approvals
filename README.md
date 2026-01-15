# Workspace Tasks & Approvals

Workspace Tasks & Approvals is a full-stack web application that allows users to create tasks, route them for approval, attach files, and manage approvals using Google Workspace integrations.

The application uses Google OAuth for authentication and integrates with Google Drive and Google Calendar to support real-world workflow automation.

---

## Project Summary

This project demonstrates a complete task approval workflow built using Django and React.

Users log in with their Google account, create tasks with optional file attachments, and approve or reject tasks through a dashboard interface. When a task is approved, a calendar event is created automatically, and attached files are uploaded to Google Drive.

The focus of this project is on clean backend design, practical API integration, and a modern, responsive frontend.

---

## Tech Stack

### Backend

- Python
- Django
- Django REST Framework
- Google OAuth 2.0
- Google Drive API
- Google Calendar API

### Frontend

- React
- Tailwind CSS
- Axios

---

## Features

### Authentication

- Google OAuth login
- User information stored after successful login
- OAuth tokens used for Google API access

### Task Management

- Create tasks with:
    - Title
    - Description
    - Due date
    - Optional file attachment
- Tasks are stored with a default status of `PENDING`

### Approval Workflow

- Tasks can be approved or rejected from the dashboard
- Status updates immediately after action
- Approved tasks trigger additional integrations

### Google Drive Integration

- Optional file upload while creating a task
- Files are uploaded to the authenticated user’s Google Drive
- Drive file ID is stored with the task

### Google Calendar Integration

- When a task is approved, a calendar event is created automatically
- Event details are derived from the task information

### Frontend UI

- Login page styled with Tailwind CSS and gradient background
- Dashboard with:
    - Create Task form
    - Task list
    - Approve / Reject buttons
    - Status badges for tasks
- Consistent theme using Tailwind and glassmorphism-style cards

---

## Project Structure

```
backend/
 ├── tasks/
 │   ├── models.py
 │   ├── serializers.py
 │   ├── views.py
 │   ├── urls.py
 │   └── services/
 │       ├── google_oauth.py
 │       ├── google_calendar.py
 │       ├── google_drive.py
 │       └── google_chat.py
 └── settings.py

frontend/
 ├── src/
 │   ├── pages/
 │   │   ├──Login.jsx
 │   │   └── Dashboard.jsx
 │   ├── components/
 │   │   └── CreateTaskForm.jsx
 │   ├── services/
 │   │   └── api.js
 │   └──index.css

```

---

## How the Application Works

1. User opens the application and logs in using Google OAuth
2. After login, the user is redirected to the dashboard
3. User creates a task with optional file attachment
4. Task appears in the task list with status `PENDING`
5. User can approve or reject the task
6. If approved:
    - A Google Calendar event is created
    - The attached file is stored in Google Drive

---

## Setup Instructions

### Backend

```
cd backend
python manage.py migrate
python manage.py runserver

```

The backend runs on:

```
http://localhost:8000

```

---

### Frontend

```
cd frontend
npm install
npm run dev

```

The frontend runs on:

```
http://localhost:5173

```

---

## Notes and Design Decisions

- Google Chat integration was implemented at the service level but not enabled due to webhook restrictions on personal Gmail accounts.
- The backend follows a service-based structure to keep Google API logic separate from view logic.
- The frontend focuses on clarity and usability rather than over-complex UI behavior.
- User ID is currently hardcoded on the frontend for demonstration purposes.
