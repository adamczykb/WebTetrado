from django.core.files.temp import NamedTemporaryFile

def handle_uploaded_file(f):
    data_file = NamedTemporaryFile()
    for chunk in f.chunks():
        data_file.write(chunk)
    n = TemporaryFile()
    n.file.save(name=f.name,content=data_file)
    n.file_extension=f.name.split('.')[-1]
    n.save()
    data_file.close()
    return str(n.id)