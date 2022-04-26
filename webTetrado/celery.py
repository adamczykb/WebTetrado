import os
from celery import Celery


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'webTetrado.settings')

app = Celery('WebTetrado')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.timezone = 'Europe/Warsaw'
app.conf.enable_utc = False
app.autodiscover_tasks()
