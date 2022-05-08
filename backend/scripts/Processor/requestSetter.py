from webTetrado import settings
from django.core.files.temp import NamedTemporaryFile
from django.http import HttpResponse
from backend.models import TemporaryFile, TetradoRequest
from backend.scripts.Processor.processorResultGetter import add_to_queue
import django_rq, redis, json, requests


def set_request_action(request):    
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    entity = TetradoRequest()
    entity.cookie_user_id=""
    entity.complete_2d=body['settings']['complete2d']
    entity.no_reorder=body['settings']['noReorder']
    entity.strict=body['settings']['strict']
    entity.stacking_mismatch=body['settings']['stackingMatch']
    entity.g4_limited=body['settings']['g4Limited']
    entity.status=1

    if 'fileId' in body and len(body['fileId'])>0:
        entity.source=2
        temp_file=TemporaryFile.objects.get(id=body['fileId'])
        entity.structure_body.save(name= temp_file.file.name.split('/')[-1],content=temp_file.file.open('rb'))
        entity.file_extension=temp_file.file_extension
        TemporaryFile.objects.get(id=body['fileId']).delete()
    elif 'rscbPdbId' in body and len(body['rscbPdbId'])>0:
        url = 'http://files.rcsb.org/download/' + body['rscbPdbId'] + '.cif'
        r = requests.get(url, allow_redirects=True)
        if r.status_code == 200:
            data_file = NamedTemporaryFile()
            data_file.write(r.content)
            entity.source=1
            entity.file_extension='cif'
            entity.structure_body.save(name= body['rscbPdbId']+'.cif',content=data_file)
        else:
            return HttpResponse(status=404)
    else:
            return HttpResponse(status=500)

    entity.save()
    if settings.DEBUG:
        redis_cursor = redis.StrictRedis(host='127.0.0.1', port='6379', db='1', password='')
    else:
        redis_cursor = redis.StrictRedis(host='redis', port='6379', db='1', password='')
    queue = django_rq.get_queue('default', connection=redis_cursor)

    queue.enqueue(add_to_queue, entity.id)
    entity.status=2
    entity.save()
    return HttpResponse(content='{"orderId":"'+ str(entity.hash_id)+'"}', content_type='application/json')
