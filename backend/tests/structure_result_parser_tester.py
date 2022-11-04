from Bio.PDB import MMCIFIO
from django.test import TestCase
from backend.eltetrado_communicator.result_parser import parse_result_from_backend
from backend.models import TetradoRequest
import httpretty
from WebTetrado.settings import WEBTETRADO_BACKEND_URL
from WebTetrado.settings import BASE_DIR


class ResultParserTest(TestCase):
    @httpretty.activate
    def setUp(self):
        httpretty.register_uri(
            httpretty.GET,
            str(WEBTETRADO_BACKEND_URL) + "/v1/draw-tetrado/(w )",
            body="",
        )
        httpretty.register_uri(
            httpretty.GET,
            str(WEBTETRADO_BACKEND_URL) + "/v1/r-chie/(w )?canonical=false",
            body="",
        )
        httpretty.register_uri(
            httpretty.GET,
            str(WEBTETRADO_BACKEND_URL) + "/v1/r-chie/(w )?canonical=true",
            body="",
        )
        httpretty.register_uri(
            httpretty.GET,
            str(WEBTETRADO_BACKEND_URL)
            + "/v1/varna/(w )?canonical=false&non-canonical=false",
            body="",
        )
        httpretty.register_uri(
            httpretty.GET,
            str(WEBTETRADO_BACKEND_URL)
            + "/v1/varna/(w )?canonical=false&non-canonical=true",
            body="",
        )
        httpretty.register_uri(
            httpretty.GET,
            str(WEBTETRADO_BACKEND_URL)
            + "/v1/varna/(w )?canonical=true&non-canonical=false",
            body="",
        )
        httpretty.register_uri(
            httpretty.GET,
            str(WEBTETRADO_BACKEND_URL)
            + "/v1/varna/(w )?canonical=true&non-canonical=true",
            body="",
        )
    def tetrad_file_residue_check(self,entity):
        io = MMCIFIO()
        for i in entity.helice.all():
            for j in i.quadruplex.all():
                for k in j.tetrad.all():
                    io.set_structure(k.tetrad_file.path)
                    self.assertEqual(len(io.structure[0][0].get_residues()),4)

    @httpretty.activate
    def test_get1JJP1_doParseToDatabase_resultSuccess(self):
        httpretty.register_uri(
            httpretty.GET,
            str(WEBTETRADO_BACKEND_URL) + "/v1/result/" + "code_1jjp",
            body="".join(
                [
                    i
                    for i in open(
                        str(BASE_DIR) + "/backend/tests/test_files/1jjp_1.json", "r"
                    )
                ]
            ),
        )
        entity = TetradoRequest()
        entity.complete_2d = False
        entity.structure_body.save(content=open(str(BASE_DIR)+'/backend/tests/test_files/1jjp_1.cif','rb'))
        entity.structure_body_original.save(content=open(str(BASE_DIR)+'/backend/tests/test_files/1jjp.cif','rb'))
        entity.no_reorder = False
        entity.strict = False
        entity.stacking_mismatch = 2
        entity.g4_limited = False
        entity.model = 1
        entity.status = 1
        entity.source = 1
        entity.file_extension = "cif"
        entity.save()
        self.assertTrue(parse_result_from_backend(entity, "code_1jjp"))
        self.tetrad_file_residue_check(entity)

    @httpretty.activate
    def test_get2HY91_doParseToDatabase_resultSuccess(self):
        httpretty.register_uri(
            httpretty.GET,
            str(WEBTETRADO_BACKEND_URL) + "/v1/result/" + "code_2hy9",
            body="".join(
                [
                    i
                    for i in open(
                        str(BASE_DIR) + "/backend/tests/test_files/2hy9_1.json", "r"
                    )
                ]
            ),
        )
        entity = TetradoRequest()
        entity.complete_2d = False
        entity.structure_body.save(content=open(str(BASE_DIR)+'/backend/tests/test_files/2hy9_1.cif','rb'))
        entity.structure_body_original.save(content=open(str(BASE_DIR)+'/backend/tests/test_files/2hy9.cif','rb'))
        entity.no_reorder = False
        entity.strict = False
        entity.stacking_mismatch = 2
        entity.g4_limited = False
        entity.model = 1
        entity.status = 1
        entity.source = 1
        entity.file_extension = "cif"
        entity.save()
        self.assertTrue(parse_result_from_backend(entity, "code_2hy9"))
        self.tetrad_file_residue_check(entity)

    @httpretty.activate
    def test_get6RS31_doParseToDatabase_resultSuccess(self):
        httpretty.register_uri(
            httpretty.GET,
            str(WEBTETRADO_BACKEND_URL) + "/v1/result/" + "code_6rs3",
            body="".join(
                [
                    i
                    for i in open(
                        str(BASE_DIR) + "/backend/tests/test_files/6rs3_1.json", "r"
                    )
                ]
            ),
        )
        entity = TetradoRequest()
        entity.complete_2d = False
        entity.structure_body.save(content=open(str(BASE_DIR)+'/backend/tests/test_files/6rs3_1.cif','rb'))
        entity.structure_body_original.save(content=open(str(BASE_DIR)+'/backend/tests/test_files/6rs3.cif','rb'))
        entity.no_reorder = False
        entity.strict = False
        entity.stacking_mismatch = 2
        entity.g4_limited = False
        entity.model = 1
        entity.status = 1
        entity.source = 1
        entity.file_extension = "cif"
        entity.save()
        self.assertTrue(parse_result_from_backend(entity, "code_6rs3"))
        self.tetrad_file_residue_check(entity)

    @httpretty.activate
    def test_get6FC91_doParseToDatabase_resultSuccess(self):
        httpretty.register_uri(
            httpretty.GET,
            str(WEBTETRADO_BACKEND_URL) + "/v1/result/" + "code_6fc9",
            body="".join(
                [
                    i
                    for i in open(
                        str(BASE_DIR) + "/backend/tests/test_files/6fc9_1.json", "r"
                    )
                ]
            ),
        )
        entity = TetradoRequest()
        entity.complete_2d = False
        entity.structure_body.save(content=open(str(BASE_DIR)+'/backend/tests/test_files/6fc9_1.cif','rb'))
        entity.structure_body_original.save(content=open(str(BASE_DIR)+'/backend/tests/test_files/6fc9.cif','rb'))
        entity.no_reorder = False
        entity.strict = False
        entity.stacking_mismatch = 2
        entity.g4_limited = False
        entity.model = 1
        entity.status = 1
        entity.source = 1
        entity.file_extension = "cif"
        entity.save()
        self.assertTrue(parse_result_from_backend(entity, "code_6fc9"))
        self.tetrad_file_residue_check(entity)

