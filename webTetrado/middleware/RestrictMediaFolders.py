import os

from django.conf import settings
from django.contrib import messages
from django.utils.deprecation import MiddlewareMixin
from django.core.exceptions import PermissionDenied

class RestrictMediaFolders(MiddlewareMixin):
    """
    Class Middleware to protect specific media folders
    to only staff/superuser who have access to them.
    """

    def process_request(self, request):
        protected_folders = getattr(settings, 'PROTECTED_MEDIA_FOLDERS', [])

        for folder in protected_folders:
            # 'tellme'  => 'tellme/'
            # 'tellme/' => 'tellme/'
            if folder[:-1] != '/':
                folder = f'{folder}/'

            # folder_path  => '/media/tellme/'
            # request.path => '/media/tellme/screenshots/screenshot_fw9h8D.png'
            folder_path = os.path.join(settings.MEDIA_URL, folder)
            if folder_path in request.path:
                user = request.user
                if user.is_authenticated and (user.is_superuser | user.is_staff):
                    # that mean user will able to access
                    pass
                else:
                    message = 'You are not allowed to access this path or file.'
                    messages.error(request, message)
                    raise PermissionDenied()