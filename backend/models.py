from django.db import models
from django.dispatch import receiver
from django.db.models.signals import pre_delete

class Metadata(models.Model):
    molecule=models.CharField(max_length=100,blank=True)
    method=models.CharField(max_length=100,blank=True)
    planarity=models.FloatField(default=0)
    onz_class=models.CharField(max_length=100,blank=True)
    tetrad_combination=models.CharField(max_length=100,blank=True)
    loopClassification=models.CharField(max_length=50,blank=True)

    structure_dot_bracked=models.TextField(blank=True)
    varna=models.FileField(upload_to='files/results/varna/',blank=True)
    r_chie=models.FileField(upload_to='files/results/r_chie/',blank=True)
    layers=models.FileField(upload_to='files/results/layers/',blank=True)

@receiver(pre_delete,sender=Metadata)
def remove_file(**kwargs):
    instance = kwargs.get('instance')
    instance.varna.delete(save=False)
    instance.r_chie.delete(save=False)
    instance.layers.delete(save=False)

class Nucleotide(models.Model):
    id = models.AutoField(primary_key=True)
    query_id=models.IntegerField()
    number=models.IntegerField()
    symbol=models.CharField(max_length=20)
    chain =models.CharField(max_length=20)
    glycosidicBond =models.CharField(max_length=100) 
    name=models.CharField(max_length=100)
    chi_angle=models.FloatField()
    molecule=models.CharField(max_length=50)
    def __str__(self):
        return str(self.name)

class BasePair(models.Model):
    id = models.AutoField(primary_key=True)
    edge3=models.CharField(max_length=20)
    edge5=models.CharField(max_length=20)
    nt1=models.ForeignKey(to=Nucleotide,related_name='nucleotide_bp_1', on_delete=models.DO_NOTHING)
    nt2=models.ForeignKey(to=Nucleotide,related_name='nucleotide_bp_2', on_delete=models.DO_NOTHING)
    stericity=models.CharField(max_length=20)
    def __str__(self):
        return str(self.nt1.name)+'-'+str(self.nt2.name)

class Tetrad(models.Model):
    id = models.AutoField(primary_key=True)
    name=models.CharField(max_length=100)
    query_id=models.IntegerField()
    metadata=models.ForeignKey(to=Metadata, on_delete=models.CASCADE)
    nt1=models.ForeignKey(to=Nucleotide,related_name='nucleotide1', on_delete=models.DO_NOTHING)
    nt2=models.ForeignKey(to=Nucleotide,related_name='nucleotide2', on_delete=models.DO_NOTHING)
    nt3=models.ForeignKey(to=Nucleotide,related_name='nucleotide3', on_delete=models.DO_NOTHING)
    nt4=models.ForeignKey(to=Nucleotide,related_name='nucleotide4', on_delete=models.DO_NOTHING)
    def __str__(self):
        return '('+str(self.query_id)+') '+self.name

class TetradPair(models.Model):
    id = models.AutoField(primary_key=True)
    # metadata=models.ForeignKey(to=Metadata, on_delete=models.CASCADE)
    tetrad1=models.ForeignKey(to=Tetrad,related_name='tetrad1', on_delete=models.DO_NOTHING)
    tetrad2=models.ForeignKey(to=Tetrad,related_name='tetrad2', on_delete=models.DO_NOTHING)
    rise=models.FloatField()
    twist=models.FloatField()
    strand_direction=models.CharField(max_length=100)

class Loop(models.Model):
    id = models.AutoField(primary_key=True)
    length=models.IntegerField()
    type=models.CharField(max_length=50)
    nucleotide=models.ManyToManyField(Nucleotide)
    def __str__(self):
        return self.full_sequence

class Quadruplex(models.Model):
    id = models.AutoField(primary_key=True)
    metadata=models.ForeignKey(to=Metadata, on_delete=models.CASCADE)
    tetrad=models.ManyToManyField(Tetrad)
    loop=models.ManyToManyField(Loop)

class Helice(models.Model):
    id = models.AutoField(primary_key=True)
    quadruplex=models.ManyToManyField(Quadruplex)
    tetrad_pair=models.ManyToManyField(TetradPair)
    def __str__(self):
            return 'Helice '+str(self.id)
class TemporaryFile(models.Model):
    id = models.AutoField(primary_key=True)
    file=models.FileField(upload_to='uploads/')
    file_extension=models.CharField(max_length=20)
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
        ERROR = 5, 'ERROR' 

    id = models.AutoField(primary_key=True)
    cookie_user_id=models.CharField(max_length=50)
    source = models.IntegerField(choices=Sources.choices)
    status = models.IntegerField(choices=Statuses.choices)
    structure_body=models.FileField(upload_to='files/structures/')
    file_extension=models.CharField(max_length=20)
    complete_2d=models.BooleanField()
    no_reorder=models.BooleanField()
    stacking_mismatch=models.IntegerField()
    strict=models.BooleanField()

    name =models.CharField(max_length=200) 
    structure_method =models.CharField(max_length=200)
    idcode=models.CharField(max_length=20)

    helice = models.ManyToManyField(Helice)
    timestamp=models.DateTimeField(auto_now=True)
    elTetradoKey=models.CharField(max_length=100)
    base_pair=models.ManyToManyField(BasePair)

    def __str__(self):
            return 'Request '+str(self.id)+' ('+str(self.source)+') <'+str(self.status)+'> '

