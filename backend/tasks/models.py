from django.db import models

# Create your models here.


class User(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    google_id = models.CharField(max_length=100)
    access_token = models.TextField()
    refresh_token = models.TextField()

    def __str__(self):
        return self.email


class Task(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_tasks')
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assigned_tasks')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    due_date = models.DateTimeField()
    drive_file_id = models.CharField(max_length=200, null=True, blank=True)
    calendar_event_id = models.CharField(max_length=200, null=True, blank=True)
