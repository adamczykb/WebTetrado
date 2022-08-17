from webTetrado.celery import app
from backend.models import TetradoRequest,Nucleotide,TemporaryFile,Log
from datetime import datetime as dt
import datetime
import traceback
@app.task()
def remove_old_queries(args=None):
    try:
        TemporaryFile.objects.filter(timestamp__lte=dt.today() - datetime.timedelta(days=1)).delete()
        for request in TetradoRequest.objects.filter(timestamp__lte=dt.today() - datetime.timedelta(days=7)):
            for helice in request.helice.all():
                helice.tetrad_pair.all().delete()
                for quadruplex in helice.quadruplex.all():
                    quadruplex.tetrad.all().delete()
                    quadruplex.loop.all().delete()
            request.base_pair.all().delete()
            request.delete()
            Nucleotide.objects.filter(query_id=request.id).delete()

        return 'scheduled remove old queries service done'
    except Exception:
        Log.objects.create(type='Error [requrence_task] ',
                            info=str(), traceback=traceback.format_exc()).save()
        return None

