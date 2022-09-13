from django.core.files.temp import NamedTemporaryFile
from backend.models import TemporaryFile
from Bio.PDB import FastMMCIFParser
from Bio.PDB.PDBParser import PDBParser


def handle_uploaded_file(f):
    try:
        data_file = NamedTemporaryFile()
        for chunk in f.chunks():
            data_file.write(chunk)
        n = TemporaryFile()
        n.file.save(name=f.name, content=data_file)
        n.file_extension = f.name.split(".")[-1].lower()
        n.save()
        if f.name.split(".")[-1].lower() == "pdb":
            models_num = len(
                PDBParser(PERMISSIVE=1, QUIET=True).get_structure(
                    "str", str(n.file.path)
                )
            )
        if f.name.split(".")[-1].lower() == "cif":
            models_num = len(
                FastMMCIFParser(QUIET=True).get_structure("str", str(n.file.path))
            )
        data_file.close()
    except Exception:
        return "0", 0, f.name + " is not proper file."
    return str(n.id), models_num, ""
