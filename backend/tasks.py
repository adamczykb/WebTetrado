import datetime
import traceback
from datetime import datetime as dt
from typing import Literal
from WebTetrado.celery import app
from backend.models import TetradoRequest, Nucleotide, TemporaryFile, Log


@app.task()
def remove_old_queries() -> Literal["remove_old_queries_done", False]:
    try:
        TemporaryFile.objects.filter(
            timestamp__lte=dt.today() - datetime.timedelta(days=1)
        ).delete()
        for request in TetradoRequest.objects.filter(
            timestamp__lte=dt.today() - datetime.timedelta(days=7)
        ):
            for helice in request.helice.all():
                helice.tetrad_pair.all().delete()
                for quadruplex in helice.quadruplex.all():
                    quadruplex.tetrad.all().delete()
                    quadruplex.loop.all().delete()
            request.base_pair.all().delete()
            request.delete()
            Nucleotide.objects.filter(query_id=request.id).delete()
        return "remove_old_queries_done"
    except Exception:
        Log.objects.create(
            type="Error [requrence_task__remove_old_queries] ",
            info=str(),
            traceback=traceback.format_exc(),
        ).save()
        return False
