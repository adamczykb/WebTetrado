from django.core.exceptions import ObjectDoesNotExist
from backend.models import TetradoRequest
from backend.request_handler.result_composer import compose_json_result

def get_result_action(order_id:str) -> str:
    try:
        request = TetradoRequest.objects.get(hash_id=order_id)
        if len(request.cached_result) == 0:
            return compose_json_result(request.id)
        return request.cached_result
    except ObjectDoesNotExist:
        return '{"status":0,"helice":[],"base_pair":[],"nucleotide":[]}'
