from django.core.files.temp import NamedTemporaryFile
from django.test import TestCase
import requests
import filecmp
from WebTetrado.settings import BASE_DIR

from backend.file_processor.structure_model_filter import filter_cif_model, filter_pdb_model

class StructureParserTest(TestCase):
    def test_give6rs3Cif_doFilterModel_getFilteredFirstModel(self):
        url = "http://files.rcsb.org/download/6rs3.cif"
        r = requests.get(url, allow_redirects=True)
        self.assertTrue(r.status_code == 200, msg="RSCB server not responds")
        structure_file = NamedTemporaryFile()
        structure_file.write(r.content)

        filter_cif_model(structure_file.name, 1)
        self.assertTrue(
            filecmp.cmp(
                structure_file.name,
                str(BASE_DIR) + "/backend/tests/test_files/6rs3_1.cif",
            )
        )

    def test_give6rs3Pdb_doFilterModel_getFilteredFirstModel(self):
        url = "http://files.rcsb.org/download/6rs3.pdb"
        r = requests.get(url, allow_redirects=True)
        self.assertTrue(r.status_code == 200, msg="RSCB server not responds")
        structure_file = NamedTemporaryFile()
        structure_file.write(r.content)

        filter_pdb_model(structure_file.name, 1)
        self.assertTrue(
            filecmp.cmp(
                structure_file.name,
                str(BASE_DIR) + "/backend/tests/test_files/6rs3_1.pdb",
            )
        )

    def test_give2hy9Cif_doFilterModel_getFilteredFirstModel(self):
        url = "http://files.rcsb.org/download/2hy9.cif"
        r = requests.get(url, allow_redirects=True)
        self.assertTrue(r.status_code == 200, msg="RSCB server not responds")
        structure_file = NamedTemporaryFile()
        structure_file.write(r.content)

        filter_cif_model(structure_file.name, 1)
        self.assertTrue(
            filecmp.cmp(
                structure_file.name,
                str(BASE_DIR) + "/backend/tests/test_files/2hy9_1.cif",
            )
        )

    def test_give2hy9Pdb_doFilterModel_getFilteredFirstModel(self):
        url = "http://files.rcsb.org/download/2hy9.pdb"
        r = requests.get(url, allow_redirects=True)
        self.assertTrue(r.status_code == 200, msg="RSCB server not responds")
        structure_file = NamedTemporaryFile()
        structure_file.write(r.content)

        filter_pdb_model(structure_file.name, 1)
        self.assertTrue(
            filecmp.cmp(
                structure_file.name,
                str(BASE_DIR) + "/backend/tests/test_files/2hy9_1.pdb",
            )
        )
