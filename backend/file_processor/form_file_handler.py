from django.core.files.temp import NamedTemporaryFile
from Bio.PDB import FastMMCIFParser
from Bio.PDB.PDBParser import PDBParser
from backend.models import TemporaryFile

def handle_uploaded_file(file):
    try:
        data_file = NamedTemporaryFile()
        for chunk in file.chunks():
            data_file.write(chunk)
        n = TemporaryFile()
        n.file.save(name=file.name, content=data_file)
        n.file_extension = file.name.split(".")[-1].lower()
        n.save()

        models_num=0
        if file.name.split(".")[-1].lower() == "pdb":
            models_num = len(
                PDBParser(PERMISSIVE=1, QUIET=True).get_structure(
                    "str", str(n.file.path)
                )
            )
        if file.name.split(".")[-1].lower() == "cif":
            models_num = len(
                FastMMCIFParser(QUIET=True).get_structure("str", str(n.file.path))
            )
        data_file.close()
    except Exception:
        return '0', 0, file.name + " is not proper file."
    return str(n.id), models_num, ""
