import Bio

from tempfile import NamedTemporaryFile
from Bio.PDB import MMCIFParser
from Bio.PDB.mmcifio import MMCIFIO
from Bio.PDB import PDBIO
from backend.scripts.Processor.structureSymteryAdder import add_necessary_column_cif, add_symetry_data_cif, add_symetry_data_pdb

 
class TetradSelect(Bio.PDB.Select):
    ids = []

    def __init__(self, ids):
        self.ids = ids

    def accept_residue(self, residue):
        if residue.get_full_id()[2]+'.'+residue.get_resname()+str(residue.get_id()[1]) in self.ids:
            return 1
        else:
            return 0


def get_cetrain_tetrad_file(file_data, tetrad_residue, tetrad_output_file, db_id, cif=True):
    tetrad_file = NamedTemporaryFile()
    if cif:
        io = MMCIFIO()
        output_extension = '.cif'
    else:
        io = PDBIO()
        output_extension = '.pdb'
    io.set_structure(file_data)
    io.save(tetrad_file.name, TetradSelect(tetrad_residue))
    if cif:
        add_necessary_column_cif(tetrad_file.name)
        add_symetry_data_cif(tetrad_file.name, tetrad_file.name)
    else:
        add_symetry_data_pdb(tetrad_file.name, tetrad_file.name)
    tetrad_output_file.save('-'.join(tetrad_residue).replace('.','_')
                            +'__'+str(db_id)+output_extension, tetrad_file)
    tetrad_file.close()
