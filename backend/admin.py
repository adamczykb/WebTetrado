from django.contrib import admin
from backend.models import Helice, Loop, Metadata, Nucleotide, Quadruplex, TemporaryFile, Tetrad, TetradPair, TetradoRequest, BasePair, Log


@admin.register(TemporaryFile)
class TemporaryFiles(admin.ModelAdmin):
    list_display = ('id', 'file', 'file_extension', 'timestamp')


@admin.register(TetradoRequest)
class TetradoRequest(admin.ModelAdmin):
    list_display = ('id', 'source', 'status', 'cookie_user_id', 'timestamp', 'structure_body', 'varna',
                    'r_chie', 'draw_tetrado', 'complete_2d', 'no_reorder', 'stacking_mismatch', 'strict', 'elTetradoKey')


@admin.register(Quadruplex)
class Quadruplex(admin.ModelAdmin):
    list_display = ('id', 'metadata')


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


@admin.register(Log)
class Log(admin.ModelAdmin):
    list_display = ('type', 'info', 'timestamp')
