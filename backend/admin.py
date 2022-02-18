from django.contrib import admin
from backend.models import TemporaryFile
# Register your models here.
@admin.register(TemporaryFile)
class TemporaryFiles(admin.ModelAdmin):
    list_display = ('id', 'file','timestamp')