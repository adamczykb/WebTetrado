from django.db import models
from django.dispatch import receiver
from django.db.models.signals import pre_delete
import uuid

class Metadata(models.Model):
    COLOR_CHOICES = (
        ('UNI', 'unimolecular'),
        ('BI', 'bimolecular'),
        ('TETRA', 'tetramolecular'),
        ('OTHER', 'other'),
    )

    molecule = models.CharField(max_length=100, blank=True)
    method = models.CharField(max_length=100, blank=True)
    planarity = models.FloatField(default=0)
    onz_class = models.CharField(max_length=100, blank=True)
    tetrad_combination = models.CharField(max_length=100, blank=True)
    loopClassification = models.CharField(max_length=50, blank=True)
    type = models.CharField(choices=COLOR_CHOICES, max_length=10,default='OTHER')
    structure_dot_bracked = models.TextField(blank=True)


class Nucleotide(models.Model):
    id = models.AutoField(primary_key=True)
    query_id = models.IntegerField()
    number = models.IntegerField()
    symbol = models.CharField(max_length=20)
    chain = models.CharField(max_length=20)
    glycosidicBond = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    chi_angle = models.CharField(max_length=20)
    molecule = models.CharField(max_length=50)

    def __str__(self):
        return str(self.name)


class BasePair(models.Model):
    id = models.AutoField(primary_key=True)
    edge3 = models.CharField(max_length=20)
    edge5 = models.CharField(max_length=20)
    nt1 = models.ForeignKey(
        to=Nucleotide, related_name='nucleotide_bp_1', on_delete=models.DO_NOTHING)
    nt2 = models.ForeignKey(
        to=Nucleotide, related_name='nucleotide_bp_2', on_delete=models.DO_NOTHING)
    stericity = models.CharField(max_length=20)

    def __str__(self):
        return str(self.nt1.name)+'-'+str(self.nt2.name)


class Tetrad(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    query_id = models.IntegerField()
    metadata = models.ForeignKey(to=Metadata, on_delete=models.CASCADE)
    nt1 = models.ForeignKey(
        to=Nucleotide, related_name='nucleotide1', on_delete=models.DO_NOTHING)
    nt2 = models.ForeignKey(
        to=Nucleotide, related_name='nucleotide2', on_delete=models.DO_NOTHING)
    nt3 = models.ForeignKey(
        to=Nucleotide, related_name='nucleotide3', on_delete=models.DO_NOTHING)
    nt4 = models.ForeignKey(
        to=Nucleotide, related_name='nucleotide4', on_delete=models.DO_NOTHING)
    tetrad_file = models.FileField(
        upload_to='files/results/tetrad/', blank=True)

    def __str__(self):
        return '('+str(self.query_id)+') '+self.name


@receiver(pre_delete, sender=Tetrad)
def remove_file(**kwargs):
    instance = kwargs.get('instance')
    instance.tetrad_file.delete(save=False)


class TetradPair(models.Model):
    id = models.AutoField(primary_key=True)
    tetrad1 = models.ForeignKey(
        to=Tetrad, related_name='tetrad1', on_delete=models.DO_NOTHING)
    tetrad2 = models.ForeignKey(
        to=Tetrad, related_name='tetrad2', on_delete=models.DO_NOTHING)
    rise = models.FloatField()
    twist = models.FloatField()
    strand_direction = models.CharField(max_length=100)


class Loop(models.Model):
    id = models.AutoField(primary_key=True)
    length = models.IntegerField()
    type = models.CharField(max_length=50)
    nucleotide = models.ManyToManyField(Nucleotide)


class Quadruplex(models.Model):
    id = models.AutoField(primary_key=True)
    metadata = models.ForeignKey(to=Metadata, on_delete=models.CASCADE)
    tetrad = models.ManyToManyField(Tetrad)
    loop = models.ManyToManyField(Loop)


class Helice(models.Model):
    id = models.AutoField(primary_key=True)
    quadruplex = models.ManyToManyField(Quadruplex)
    tetrad_pair = models.ManyToManyField(TetradPair)

    def __str__(self):
        return 'Helice '+str(self.id)


class TemporaryFile(models.Model):
    id = models.AutoField(primary_key=True)
    file = models.FileField(upload_to='uploads/')
    file_extension = models.CharField(max_length=20)
    timestamp = models.DateTimeField(auto_now=True)


@receiver(pre_delete, sender=TemporaryFile)
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
    hash_id = models.UUIDField(default=uuid.uuid1, editable=False)
    cookie_user_id = models.CharField(max_length=50)
    source = models.IntegerField(choices=Sources.choices)
    status = models.IntegerField(choices=Statuses.choices)
    structure_body = models.FileField(upload_to='files/structures/')
    dot_bracket_line1 = models.TextField(blank=True)
    dot_bracket_line2 = models.TextField(blank=True)
    dot_bracket_sequence = models.TextField(blank=True)
    file_extension = models.CharField(max_length=20)
    complete_2d = models.BooleanField()
    no_reorder = models.BooleanField()
    stacking_mismatch = models.IntegerField()
    strict = models.BooleanField()
    g4_limited = models.BooleanField()

    name = models.CharField(max_length=200)
    structure_method = models.CharField(max_length=200)
    idcode = models.CharField(max_length=20)

    helice = models.ManyToManyField(Helice)
    timestamp = models.DateTimeField(auto_now=True)
    elTetradoKey = models.CharField(max_length=100)
    base_pair = models.ManyToManyField(BasePair)
    varna = models.FileField(upload_to='files/results/varna/', blank=True)
    r_chie = models.FileField(upload_to='files/results/r_chie/', blank=True)
    draw_tetrado = models.FileField(
        upload_to='files/results/layers/', blank=True)

    cached_result= models.TextField(blank=True)
    error=models.TextField(default='')
    def __str__(self):
        return 'Request '+str(self.id)+' ('+str(self.source)+') <'+str(self.status)+'> '


@receiver(pre_delete, sender=TetradoRequest)
def remove_file(**kwargs):
    instance = kwargs.get('instance')
    instance.varna.delete(save=False)
    instance.r_chie.delete(save=False)
    instance.draw_tetrado.delete(save=False)
    for base_pair in instance.base_pair.all():
        base_pair.delete()
    for helice in instance.helice.all():
        helice.delete()


class Log(models.Model):
    type = models.CharField(max_length=255)
    info = models.CharField(max_length=255)
    traceback = models.TextField(default='')
    timestamp = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Error logs"
        db_table = "webtetrado_logs"
