from django.contrib import admin
from backend.models import Helice, Loop, Metadata, Nucleotide, Quadruplex, TemporaryFile, Tetrad, Tetrad_Pairs, TetradoRequest
# Register your models here.
@admin.register(TemporaryFile)
class TemporaryFiles(admin.ModelAdmin):
    list_display = ('id', 'file','timestamp')

@admin.register(TetradoRequest)
class TetradoRequest(admin.ModelAdmin):
    list_display = ('id', 'source','status','cookie_user_id','timestamp','structure_body','complete_2d','no_reorder','stacking_mismatch','strict','elTetradoKey')

@admin.register(Quadruplex)
class Quadruplex(admin.ModelAdmin):
    list_display = ('id', 'metadata')

# @admin.register(Helice)
# class Helice(admin.ModelAdmin):
#     list_display = ('id')

@admin.register(Loop)
class Loop(admin.ModelAdmin):
    list_display = ('id','short_sequence','full_sequence','type','length')

@admin.register(Tetrad_Pairs)
class Tetrad_Pairs(admin.ModelAdmin):
    list_display = ('id','tetrad1','tetrad2','rise','twist','strand_direction')

@admin.register(Tetrad)
class Tetrad(admin.ModelAdmin):
    list_display = ('id','name','query_id','metadata','nt1','nt2','nt3','nt4')

@admin.register(Nucleotide)
class Nucleotide(admin.ModelAdmin):
    list_display = ('id','number','symbol','chain','name','chi_angle','molecule')

@admin.register(Metadata)
class Metadata(admin.ModelAdmin):
    list_display = ('molecule','method','planarity','onz_class','tetrad_combination','loopClassification','structure_dot_bracked','varna','r_chie','layers')