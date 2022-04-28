from django.core.files.temp import NamedTemporaryFile
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from backend.scripts.userRequestList import user_request_list
from webTetrado import settings
from django.views.decorators.csrf import ensure_csrf_cookie
from backend.scripts.resultRequest import get_result_action
from backend.scripts.Processor.requestSetter import set_request_action
from backend.scripts.FileManagment.fileManagment import handle_uploaded_file
import os, logging, json, requests




@csrf_exempt
def user_request_setup_endpoint(request):
    return set_request_action(request)

@csrf_exempt
def file_handler_endpoint(request):
    if(request.FILES['structure']):
        return HttpResponse(status=200,content='{\"id\": \"%s\"}'%(handle_uploaded_file(request.FILES['structure'])), content_type='application/json')
    else:
        return HttpResponse(status=500)

def user_request_result_endpoint(request,orderId):
    return HttpResponse(status=200,content=get_result_action(orderId), content_type='application/json')


def user_request_list_endpoint(request, userId):
    return HttpResponse(status=200,content=json.dumps(user_request_list(userId)), content_type='application/json')

@ensure_csrf_cookie
def index(request):
    try:
        with open(os.path.join(settings.STATIC_ROOT, 'index.html')) as f:
            return HttpResponse(f.read())
    except FileNotFoundError:
        logging.exception('Production build of app not found')
        return HttpResponse(status=501,content="The frontend is currently under deploy")