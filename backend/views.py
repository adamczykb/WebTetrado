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
from backend.models import TemporaryFile, TetradoRequest
import json,requests
# Create your views here.

class UploadFileForm(forms.Form):
    file = forms.FileField()

def handle_uploaded_file(f):
    data_file = NamedTemporaryFile()
    for chunk in f.chunks():
        data_file.write(chunk)
    n = TemporaryFile()
    n.file.save(name=str(uuid.uuid1()),content=data_file)
    n.save()
    data_file.close()

    return str(n.id)

def show(request):
    return HttpResponse(content=TemporaryFile.objects.get(id=request.GET['id']).file.path,content_type='text/plain')


@csrf_exempt
def processing_request(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    entity = TetradoRequest()
    entity.complete_2d=body['settings']['complete2d']
    entity.no_reorder=body['settings']['noReorder']
    entity.strict=body['settings']['strict']
    entity.stacking_mismatch=body['settings']['stackingMatch']
    entity.status=1

    if 'fileId' in body and len(body['fileId'])>0:
        entity.source=2
        temp_file=TemporaryFile.objects.get(id=body['fileId'])
        entity.structure_body.save(name= temp_file.file.name.split('/')[-1],content=temp_file.file.open('rb'))
        TemporaryFile.objects.get(id=body['fileId']).delete()
    elif 'rscbPdbId' in body and len(body['rscbPdbId'])>0:
        url = 'http://files.rcsb.org/download/' + body['rscbPdbId'] + '.cif'
        r = requests.get(url, allow_redirects=True)
        if r.status_code == 200:
            data_file = NamedTemporaryFile()
            data_file.write(r.content)
            entity.source=1
            entity.structure_body.save(name= body['rscbPdbId'],content=data_file)
        else:
            return HttpResponse(status=500)
    else:
            return HttpResponse(status=500)

    entity.save()
    return HttpResponse(content='{"orderId":"'+str(entity.id)+'"}', content_type='application/json')

@csrf_exempt
def file_handler(request):
    if(request.FILES['structure']):
        
        return HttpResponse(status=200,content='{\"id\": \"%s\"}'%(handle_uploaded_file(request.FILES['structure'])), content_type='application/json')
    else:
        return HttpResponse(status=500)