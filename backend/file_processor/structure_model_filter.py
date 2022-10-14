from Bio.PDB.PDBParser import PDBParser
from Bio.PDB import PDBIO
from Bio.PDB import MMCIFParser
from Bio.PDB.mmcifio import MMCIFIO

from backend.file_processor.structure_columns_parser import add_necessary_columns_cif


def filter_cif_model(file_absolute_path: str, model_no: int) -> None:
    structure = MMCIFParser(QUIET=True).get_structure("str", file_absolute_path)[
        model_no - 1
    ]

    io = MMCIFIO()
    io.set_structure(structure)
    io.save(file_absolute_path)
    add_necessary_columns_cif(file_absolute_path)


def filter_pdb_model(file_absolute_path: str, model: int) -> None:
    structure = PDBParser(PERMISSIVE=1, QUIET=True).get_structure(
        "str", file_absolute_path
    )[model - 1]
    io = PDBIO()
    io.set_structure(structure)
    io.save(file_absolute_path)
