from django.contrib import admin
from backend.models import TemporaryFile, TetradoRequest
# Register your models here.
@admin.register(TemporaryFile)
class TemporaryFiles(admin.ModelAdmin):
    list_display = ('id', 'file','timestamp')

@admin.register(TetradoRequest)
class TetradoRequest(admin.ModelAdmin):
    list_display = ('id', 'source','status','timestamp','structure_body','complete_2d','no_reorder','stacking_mismatch','strict','elTetradoKey','loopClassification')