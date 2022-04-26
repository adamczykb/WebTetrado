from webTetrado.celery import app
from backend.models import TetradoRequest,Nucleotide,TemporaryFile
from datetime import datetime as dt
import datetime

@app.task(bind=True)
def remove_old_queries():
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


