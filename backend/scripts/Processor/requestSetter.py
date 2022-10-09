from webTetrado import settings
from django.core.files.temp import NamedTemporaryFile
from django.http import HttpResponse
from backend.models import TemporaryFile, TetradoRequest
from backend.scripts.Processor.processorResultGetter import add_to_queue
import django_rq, redis, json, requests,os
from backend.scripts.Processor.structureProcessor import cif_filter_model,pdb_filter_model
import traceback

def set_request_action(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    entity = TetradoRequest()
    entity.cookie_user_id=""
    entity.complete_2d=body['settings']['complete2d']
    entity.no_reorder=not body['settings']['reorder']
    entity.strict=body['settings']['strict']
    entity.stacking_mismatch=body['settings']['stackingMatch']
    entity.g4_limited=body['settings']['g4Limited']
    entity.model=body['settings']['model']
    entity.status=1

    if 'fileId' in body and len(body['fileId'])>0:
        entity.source=2
        if body['fileId'].split('_')[0]=='rdy':
            file_name = body['fileId'].split('_')
            try:
                temp_file=open(os.path.join(settings.BASE_DIR, 'exampleFiles/'+file_name[1]+'.'+file_name[2]),'rb')
                entity.structure_body.save(name= temp_file.name.split('/')[-1],content=temp_file)
                entity.structure_body_original.save(name= temp_file.name.split('/')[-1],content=temp_file)
                entity.file_extension=file_name[2]
            except FileNotFoundError:
                return HttpResponse(status=400)
        else:
            temp_file=TemporaryFile.objects.get(id=body['fileId'])
            entity.structure_body.save(name= temp_file.file.name.split('/')[-1],content=temp_file.file.open('rb'))
            entity.structure_body_original.save(name= temp_file.file.name.split('/')[-1],content=temp_file.file.open('rb'))
            entity.file_extension=temp_file.file_extension
            TemporaryFile.objects.get(id=body['fileId']).delete()
    elif 'rcsbPdbId' in body and len(body['rcsbPdbId'])>0:
        url = 'http://files.rcsb.org/download/' + body['rcsbPdbId'] + '.cif'
        r = requests.get(url, allow_redirects=True)
        if r.status_code == 200:
            data_file = NamedTemporaryFile()
            data_file.write(r.content)
            entity.source=1
            entity.file_extension='cif'
            entity.structure_body.save(name= body['rcsbPdbId']+'.cif',content=data_file)
            entity.structure_body_original.save(name= body['rcsbPdbId']+'.cif',content=data_file)
        else:
            return HttpResponse(status=404)
    else:
            return HttpResponse(status=500)

    entity.save()

    try:
        if entity.file_extension=='cif':
            cif_filter_model(entity.structure_body.path,entity.model)
        elif entity.file_extension=='pdb':
            pdb_filter_model(entity.structure_body.path,entity.model)
    except Exception:
        entity.status=5
        entity.error_message='Model does not exist'
        entity.save()
        return HttpResponse(status=400)
    
    entity.status=2
    entity.save()

    queue = django_rq.get_queue('default',is_async=True)
    queue.enqueue(add_to_queue, entity)
    return HttpResponse(content='{"orderId":"'+ str(entity.hash_id)+'"}', content_type='application/json')
