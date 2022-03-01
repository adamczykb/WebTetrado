from django.core.files.temp import NamedTemporaryFile
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from backend.models import TemporaryFile, TetradoRequest
from backend.scripts.userRequestList import user_request_list
from webTetrado import settings
from backend.scripts.Cipher.Cryptography import HashId
from django.views.decorators.csrf import ensure_csrf_cookie
from backend.scripts.elTetradoProcessing import add_to_queue
from backend.scripts.orderResultCompose import compose
import django_rq, redis, os, logging, json, requests

def handle_uploaded_file(f):
    data_file = NamedTemporaryFile()
    for chunk in f.chunks():
        data_file.write(chunk)
    n = TemporaryFile()
    n.file.save(name=f.name,content=data_file)
    n.file_extension=f.name.split('.')[-1]
    n.save()
    data_file.close()
    return str(n.id)


@csrf_exempt
def user_request_setup_action(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    entity = TetradoRequest()
    entity.cookie_user_id=body['userId']
    entity.complete_2d=body['settings']['complete2d']
    entity.no_reorder=body['settings']['noReorder']
    entity.strict=body['settings']['strict']
    entity.stacking_mismatch=body['settings']['stackingMatch']
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
            entity.structure_body.save(name= body['rscbPdbId'],content=data_file)
        else:
            return HttpResponse(status=500)
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
    encryptor = HashId()
    return HttpResponse(content='{"orderId":"'+ str(entity.id)+'"}', content_type='application/json')

@csrf_exempt
def file_handler_action(request):
    if(request.FILES['structure']):
        return HttpResponse(status=200,content='{\"id\": \"%s\"}'%(handle_uploaded_file(request.FILES['structure'])), content_type='application/json')
    else:
        return HttpResponse(status=500)

def user_request_result_action(request,orderId):
    return HttpResponse(status=200,content=compose(orderId), content_type='application/json')

def user_request_list_action(request, userId):
    return HttpResponse(status=200,content=json.dumps(user_request_list(userId)), content_type='application/json')

@ensure_csrf_cookie
def index(request):
    try:
        with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
            return HttpResponse(f.read())
    except FileNotFoundError:
        logging.exception('Production build of app not found')
        return HttpResponse(status=501)