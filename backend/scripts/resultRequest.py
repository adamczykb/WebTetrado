from backend.models import TetradoRequest
from backend.scripts.Processor.resultComposer import compose

def get_result_action(order_id):
    try:
        tr=TetradoRequest.objects.get(hash_id=order_id)
        if len(tr.cached_result)==0:
            return compose(tr.id)
        else:
            return tr.cached_result
    except Exception:
        return '{"status":0,"helice":[],"base_pair":[],"nucleotide":[]}'
