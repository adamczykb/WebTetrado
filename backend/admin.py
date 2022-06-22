import json
from django.contrib import admin
from backend.models import Helice, Loop, Metadata, Nucleotide, PushInformation, Quadruplex, TemporaryFile, Tetrad, TetradPair, TetradoRequest, BasePair, Log
from backend.scripts.webPush import _send_notification


@admin.register(TemporaryFile)
class TemporaryFiles(admin.ModelAdmin):
    list_display = ('id', 'file', 'file_extension', 'timestamp')


@admin.register(TetradoRequest)
class TetradoRequest(admin.ModelAdmin):
    list_display = ('id', 'source', 'status', 'cookie_user_id', 'timestamp', 'structure_body', 'varna','hash_id',
                    'r_chie', 'draw_tetrado', 'complete_2d', 'no_reorder', 'stacking_mismatch', 'strict', 'model','elTetradoKey')


@admin.register(Quadruplex)
class Quadruplex(admin.ModelAdmin):
    list_display = ('id', 'metadata')


@admin.register(Helice)
class Helice(admin.ModelAdmin):
    list_display = ('id',)

@admin.register(BasePair)
class Base_Pair(admin.ModelAdmin):
    list_display = ('id', 'nt1', 'nt2', 'edge3', 'edge5', 'stericity')


@admin.register(Loop)
class Loop(admin.ModelAdmin):
    list_display = ('id', 'type', 'length')


@admin.register(TetradPair)
class Tetrad_Pair(admin.ModelAdmin):
    list_display = ('id', 'tetrad1', 'tetrad2', 'rise',
                    'twist', 'strand_direction')


@admin.register(Tetrad)
class Tetrad(admin.ModelAdmin):
    list_display = ('id', 'name', 'query_id', 'metadata',
                    'nt1', 'nt2', 'nt3', 'nt4', 'tetrad_file')


@admin.register(Nucleotide)
class Nucleotide(admin.ModelAdmin):
    list_display = ('id', 'number', 'symbol', 'chain',
                    'name', 'chi_angle', 'molecule')


@admin.register(Metadata)
class Metadata(admin.ModelAdmin):
    list_display = ('id', 'molecule', 'method', 'planarity', 'onz_class',
                    'tetrad_combination', 'loopClassification', 'structure_dot_bracked')

@admin.register(PushInformation)
class PushInfoAdmin(admin.ModelAdmin):
    list_display = ("__str__", "hash_id", "browser", "user_agent")
    actions = ("send_test_message",)

    def send_test_message(self, request, queryset):
        payload = {"head": "Hey", "body": "Hello World"}
        for device in queryset:
            notification = _send_notification(device, json.dumps(payload), 0)
            if notification:
                self.message_user(request, "Test sent successfully")
            else:
                self.message_user(request, "Deprecated subscription deleted")


@admin.register(Log)
class Log(admin.ModelAdmin):
    list_display = ('type', 'info', 'timestamp')

