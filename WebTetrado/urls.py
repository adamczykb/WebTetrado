"""WebTetrado URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include,re_path
from django.contrib.staticfiles.storage import staticfiles_storage
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import RedirectView
from backend import views
from django.http import FileResponse
import backend.urls

def service_worker(response):
    return FileResponse(staticfiles_storage.open('service-worker.js'))

admin.site.site_header = 'WebTetrado: online tool for identification and classification of tetrads and quadruplexes'
admin.site.site_title = 'WebTetrado'

urlpatterns = [
    re_path(r'^favicon.ico$', RedirectView.as_view(url=staticfiles_storage.url('favicon.ico'))),
    re_path(r'^logo192.png$', RedirectView.as_view(url=staticfiles_storage.url('logo192.png'))),
    re_path(r'^manifest.json$', RedirectView.as_view(url=staticfiles_storage.url('manifest.json'))),
    re_path(r'^service-worker.js$',  service_worker),
    re_path(r'^asset-manifest.json$', RedirectView.as_view(url=staticfiles_storage.url('asset-manifest.json'))),
    re_path('^admin/rq/', include('django_rq.urls')),
    re_path('^admin/', admin.site.urls),
    re_path('^api/',include(backend.urls)),
    re_path("^ws/", views.websocket_endpoint),
    re_path('^robots.txt',RedirectView.as_view(url=staticfiles_storage.url('robots.txt')))
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns.append(re_path('^', views.index))
