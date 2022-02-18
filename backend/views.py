from email.policy import default
from importlib.resources import contents
import uuid
from django.core.files.temp import NamedTemporaryFile
from django.http import HttpResponse
from django.shortcuts import render
import logging
from webTetrado.settings import BASE_DIR 
from django import forms
from django.views.decorators.csrf import csrf_exempt
from backend.models import TemporaryFile
# Create your views here.

class UploadFileForm(forms.Form):
    file = forms.FileField()

def handle_uploaded_file(f):
    data_file = NamedTemporaryFile()
    for chunk in f.chunks():
        data_file.write(chunk)
    TemporaryFile().save(file=data_file)
    data_file.close()

    return 'not.jes'

def show(request):
    return HttpResponse(content=TemporaryFile.objects.get(id=request.GET['id']).file.path,content_type='text/plain')

@csrf_exempt
def file_handler(request):
    if(request.FILES['structure']):
        
        return HttpResponse(status=200,content='{\"url\": \"%s\"}'%(handle_uploaded_file(request.FILES['structure'])), content_type='application/json')
    else:
        return HttpResponse(status=500)