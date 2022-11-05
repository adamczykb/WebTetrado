"""
ASGI config for WebTetrado project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""

import os
import django
from django.core.asgi import get_asgi_application

from WebTetrado.middleware.WebSocket import websockets

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'WebTetrado.settings')
django.setup()
application = get_asgi_application()
application = websockets(application)
