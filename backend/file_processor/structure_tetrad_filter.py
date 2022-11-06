from typing import List
from tempfile import NamedTemporaryFile
from Bio.PDB.mmcifio import MMCIFIO
from Bio.PDB import PDBIO, Select
from Bio.PDB import PDBParser, MMCIFParser
from backend.file_processor.structure_columns_parser import add_necessary_columns_cif


class TetradSelect(Select):
    ids = []

    def __init__(self, ids):
        self.ids = [i.replace("/", "") for i in ids]

    def accept_residue(self, residue):
        if (
            residue.get_full_id()[2]
            + "."
            + residue.get_resname()
            + str(residue.get_id()[1])
            in self.ids
            or residue.get_full_id()[2]
            + "."
            + residue.get_resname()
            + "/"
            + str(residue.get_id()[1])
            in self.ids
            or residue.get_resname() + str(residue.get_id()[1]) in self.ids
            or residue.get_resname() + "/" + str(residue.get_id()[1]) in self.ids
        ):
            return 1
        else:
            return 0


def get_cetrain_tetrad_file(
    tetrad_residue: List[str], tetrad_result_file, user_request, cif=True
):
    tetrad_file = NamedTemporaryFile()
    if cif:
        io = MMCIFIO()
        parser = MMCIFParser(QUIET=True)
        output_extension = ".cif"
    else:
        io = PDBIO()
        parser = PDBParser(PERMISSIVE=True, QUIET=True)
        output_extension = ".pdb"

    if not user_request.structure_body:
        return

    io.set_structure(parser.get_structure("str", user_request.structure_body.path))
    io.save(tetrad_file.name, TetradSelect(tetrad_residue))
    if cif:
        add_necessary_columns_cif(tetrad_file.name)
    tetrad_result_file.save(
        "-".join(tetrad_residue).replace(".", "_").replace("/", "-") + output_extension,
        tetrad_file,
    )
    tetrad_file.close()
