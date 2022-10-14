from typing import List
import Bio
from tempfile import NamedTemporaryFile
from Bio.PDB.mmcifio import MMCIFIO
from Bio.PDB import PDBIO

from backend.file_processor.structure_columns_parser import add_necessary_columns_cif


class TetradSelect(Bio.PDB.Select):
    ids = []

    def __init__(self, ids):
        self.ids = ids

    def accept_residue(self, residue):
        if (
            residue.get_full_id()[2]
            + "."
            + residue.get_resname()
            + str(residue.get_id()[1])
            in self.ids
        ):
            return 1
        else:
            return 0


def get_cetrain_tetrad_file(
        data_file_absolute_path:str, tetrad_residue: List[str], tetrad_result_file, order_id, cif=True
):
    tetrad_file = NamedTemporaryFile()
    if cif:
        io = MMCIFIO()
        output_extension = ".cif"
    else:
        io = PDBIO()
        output_extension = ".pdb"
    io.set_structure(data_file_absolute_path)
    io.save(tetrad_file.name, TetradSelect(tetrad_residue))
    if cif:
        add_necessary_columns_cif(tetrad_file.name)
    tetrad_result_file.save(
        "-".join(tetrad_residue).replace(".", "_")
        + "__"
        + str(order_id)
        + output_extension,
        tetrad_file,
    )
    tetrad_file.close()
