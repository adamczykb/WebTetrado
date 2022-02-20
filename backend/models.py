from django.db import models
import os,uuid
from webTetrado.settings import BASE_DIR
from django.core.files.storage import FileSystemStorage
from django.dispatch import receiver
from django.db.models.signals import pre_delete
class Metadata(models.Model):
    
    molecule=models.CharField(max_length=100)
    method=models.CharField(max_length=100)
    planarity=models.FloatField()
    onz_class=models.CharField(max_length=100)
    tetrad_combination=models.CharField(max_length=100)

    structure_dot_bracked=models.TextField()
    varna=models.FileField(upload_to='files/results/varna/')
    r_chie=models.FileField(upload_to='files/results/r_chie/')
    layers=models.FileField(upload_to='files/results/layers/')
    structure3d=models.FileField(upload_to='files/results/structure3d/')

class Nucleotide(models.Model):
    id = models.AutoField(primary_key=True)
    query_id=models.IntegerField()
    number=models.IntegerField()
    symbol=models.CharField(max_length=20)
    chain =models.CharField(max_length=20)
    glycosidicBond =models.CharField(max_length=100) 
    name=models.CharField(max_length=100)
    chi_angle=models.FloatField()
    chi_angle_type=models.CharField(max_length=50)

class Base_Pair(models.Model):
    id = models.AutoField(primary_key=True)
    edge3=models.CharField(max_length=20)
    edge5=models.CharField(max_length=20)
    nt1=models.ForeignKey(to=Nucleotide,related_name='nucleotide1', on_delete=models.DO_NOTHING)
    nt2=models.ForeignKey(to=Nucleotide,related_name='nucleotide2', on_delete=models.DO_NOTHING)
    stericity=models.CharField(max_length=20)

class Tetrad(models.Model):
    id = models.AutoField(primary_key=True)
    metadata=models.ForeignKey(to=Metadata, on_delete=models.CASCADE)
    nucleotide=models.ManyToManyField(Nucleotide)

class Tetrad_Pairs(models.Model):
    id = models.AutoField(primary_key=True)
    metadata=models.ForeignKey(to=Metadata, on_delete=models.CASCADE)
    nucleotide=models.ManyToManyField(Nucleotide)
    twist=models.FloatField()
    rise=models.FloatField()
    strand_direction=models.CharField(max_length=100)

class Loops(models.Model):
    id = models.AutoField(primary_key=True)
    short_sequence=models.CharField(max_length=100)
    full_sequence=models.CharField(max_length=1000)
    length=models.IntegerField()
    type=models.CharField(max_length=50)

class Quadruplex(models.Model):
    id = models.AutoField(primary_key=True)
    metadata=models.ForeignKey(to=Metadata, on_delete=models.CASCADE)
    tetrad=models.ManyToManyField(Tetrad)
    tetrad_pair=models.ManyToManyField(Tetrad_Pairs)
    loop=models.ManyToManyField(Loops)

class TemporaryFile(models.Model):
    id = models.AutoField(primary_key=True)
    file=models.FileField(upload_to='uploads/%Y/%m/') #,storage=FileSystemStorage(location=str(BASE_DIR)+'/tmp')
    timestamp = models.DateTimeField(auto_now=True)

@receiver(pre_delete,sender=TemporaryFile)
def remove_file(**kwargs):
    instance = kwargs.get('instance')
    instance.file.delete(save=False)

class TetradoRequest(models.Model):
    class Sources(models.IntegerChoices):
        RCSB = 1, 'RCSB'
        FILE = 2, 'File'
    class Statuses(models.IntegerChoices):
        REQUESTED = 1, 'REQUESTED'
        QUEUED = 2, 'QUEUED'
        PROCESSING = 3, 'PROCESSING'
        DONE = 4, 'DONE'

    id = models.AutoField(primary_key=True)
    source = models.IntegerField(choices=Sources.choices)
    status = models.IntegerField(choices=Statuses.choices)
    structure_body=models.FileField(upload_to='files/structures/')
    complete_2d=models.BooleanField()
    no_reorder=models.BooleanField()
    stacking_mismatch=models.BooleanField()
    strict=models.BooleanField()

    timestamp=models.DateTimeField(auto_now=True)
    elTetradoKey=models.CharField(max_length=100)
    loopClassification=models.CharField(max_length=50)
    quadruplex=models.ManyToManyField(Quadruplex)
    base_pair=models.ManyToManyField(Base_Pair)
    

