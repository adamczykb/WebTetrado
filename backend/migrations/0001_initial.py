# Generated by Django 4.0.2 on 2022-02-21 23:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Base_Pair',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('edge3', models.CharField(max_length=20)),
                ('edge5', models.CharField(max_length=20)),
                ('stericity', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Helice',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Loop',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('short_sequence', models.CharField(max_length=100)),
                ('full_sequence', models.CharField(max_length=1000)),
                ('length', models.IntegerField()),
                ('type', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Metadata',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('molecule', models.CharField(max_length=100)),
                ('method', models.CharField(max_length=100)),
                ('planarity', models.FloatField()),
                ('onz_class', models.CharField(max_length=100)),
                ('tetrad_combination', models.CharField(max_length=100)),
                ('structure_dot_bracked', models.TextField()),
                ('varna', models.FileField(upload_to='files/results/varna/')),
                ('r_chie', models.FileField(upload_to='files/results/r_chie/')),
                ('layers', models.FileField(upload_to='files/results/layers/')),
            ],
        ),
        migrations.CreateModel(
            name='Nucleotide',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('query_id', models.IntegerField()),
                ('number', models.IntegerField()),
                ('symbol', models.CharField(max_length=20)),
                ('chain', models.CharField(max_length=20)),
                ('glycosidicBond', models.CharField(max_length=100)),
                ('name', models.CharField(max_length=100)),
                ('chi_angle', models.FloatField()),
                ('molecule', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='TemporaryFile',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('file', models.FileField(upload_to='uploads/%Y/%m/')),
                ('timestamp', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Tetrad',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('query_id', models.IntegerField()),
                ('metadata', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.metadata')),
                ('nt1', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='nucleotide1', to='backend.nucleotide')),
                ('nt2', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='nucleotide2', to='backend.nucleotide')),
                ('nt3', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='nucleotide3', to='backend.nucleotide')),
                ('nt4', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='nucleotide4', to='backend.nucleotide')),
            ],
        ),
        migrations.CreateModel(
            name='TetradoRequest',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('cookie_user_id', models.CharField(max_length=50)),
                ('source', models.IntegerField(choices=[(1, 'RCSB'), (2, 'File')])),
                ('status', models.IntegerField(choices=[(1, 'REQUESTED'), (2, 'QUEUED'), (3, 'PROCESSING'), (4, 'DONE'), (5, 'ERROR')])),
                ('structure_body', models.FileField(upload_to='files/structures/')),
                ('complete_2d', models.BooleanField()),
                ('no_reorder', models.BooleanField()),
                ('stacking_mismatch', models.BooleanField()),
                ('strict', models.BooleanField()),
                ('timestamp', models.DateTimeField(auto_now=True)),
                ('elTetradoKey', models.CharField(max_length=100)),
                ('base_pair', models.ManyToManyField(to='backend.Base_Pair')),
                ('helice', models.ManyToManyField(to='backend.Helice')),
            ],
        ),
        migrations.CreateModel(
            name='Tetrad_Pairs',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('rise', models.FloatField()),
                ('twist', models.FloatField()),
                ('strand_direction', models.CharField(max_length=100)),
                ('tetrad1', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='tetrad1', to='backend.tetrad')),
                ('tetrad2', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='tetrad2', to='backend.tetrad')),
            ],
        ),
        migrations.CreateModel(
            name='Quadruplex',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('loop', models.ManyToManyField(to='backend.Loop')),
                ('metadata', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.metadata')),
                ('tetrad', models.ManyToManyField(to='backend.Tetrad')),
            ],
        ),
        migrations.AddField(
            model_name='loop',
            name='nucleotide',
            field=models.ManyToManyField(to='backend.Nucleotide'),
        ),
        migrations.AddField(
            model_name='helice',
            name='quadruplex',
            field=models.ManyToManyField(to='backend.Quadruplex'),
        ),
        migrations.AddField(
            model_name='helice',
            name='tetrad_pair',
            field=models.ManyToManyField(to='backend.Tetrad_Pairs'),
        ),
        migrations.AddField(
            model_name='base_pair',
            name='nt1',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='nucleotide_bp_1', to='backend.nucleotide'),
        ),
        migrations.AddField(
            model_name='base_pair',
            name='nt2',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='nucleotide_bp_2', to='backend.nucleotide'),
        ),
    ]
