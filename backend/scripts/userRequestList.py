from backend.models import TetradoRequest


def user_request_list(userId):
    return [{"orderId":request.id,"structure":request.structure_body.name.split('/')[-1],"date":request.timestamp.strftime('%d/%m/%Y %H:%M')} for request in TetradoRequest.objects.filter(cookie_user_id=userId).order_by('-timestamp')]
     