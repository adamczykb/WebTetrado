import traceback
import time
import requests
import json
import base64

from backend.models import (
    BasePair,
    Helice,
    Log,
    Loop,
    Metadata,
    Nucleotide,
    Quadruplex,
    Tetrad,
    TetradPair,
    TetradoRequest,
)
from django.core.files.temp import NamedTemporaryFile
from Bio.PDB import PDBParser, MMCIFParser
from backend.scripts.Processor.tetradFileFilter import get_cetrain_tetrad_file
from backend.scripts.webPush import send_to_subscription
from webTetrado.settings import PROCESSOR_URL
from backend.scripts.Processor.resultComposer import compose
from enum import Enum
from django.db import models


class GetterException(Exception):
    pass


class LwParser(Enum):
    c = "cis"
    t = "trans"
    W = "Watson-Crick-Franklin"
    H = "Hoogsteen"
    S = "Sugar"


def add_base_pairs(base_pairs, user_request):
    base_pair_tetrad = set([])
    for base_pair in base_pairs:
        try:
            if (
                not tuple(sorted((base_pair["nt1"], base_pair["nt2"])))
                in base_pair_tetrad
            ):
                base_pair_tetrad.add(
                    tuple(sorted((base_pair["nt1"], base_pair["nt2"])))
                )
                base_pair_entity = BasePair()
                base_pair_entity.nt1 = Nucleotide.objects.get(
                    query_id=user_request.id, name=base_pair["nt1"]
                )
                base_pair_entity.nt2 = Nucleotide.objects.get(
                    query_id=user_request.id, name=base_pair["nt2"]
                )
                base_pair_entity.edge3 = LwParser[base_pair["lw"][2]].value
                base_pair_entity.edge5 = LwParser[base_pair["lw"][1]].value
                base_pair_entity.stericity = LwParser[base_pair["lw"][0]].value
                base_pair_entity.canonical = base_pair["canonical"]
                base_pair_entity.inTetrad = base_pair["inTetrad"]
                base_pair_entity.save()
                user_request.base_pair.add(base_pair_entity)
        except Exception:
            user_request.status = 5
            Log.objects.create(
                type="Error [processing_add_base_pairs] ",
                info=str(user_request.id),
                traceback=traceback.format_exc(),
            ).save()
            user_request.error = "Error during adding base pairs"
            user_request.save()
            raise GetterException


def add_nucleodities(nucleodities, user_request):
    for nucleodity in nucleodities:
        try:
            nucleodity_entity = Nucleotide()
            nucleodity_entity.query_id = user_request.id
            nucleodity_entity.number = nucleodity["number"]
            nucleodity_entity.symbol = nucleodity["shortName"]
            nucleodity_entity.symbol = nucleodity["shortName"]
            nucleodity_entity.chain = nucleodity["chain"]
            nucleodity_entity.glycosidicBond = nucleodity["glycosidicBond"]
            nucleodity_entity.name = nucleodity["fullName"]
            nucleodity_entity.chi_angle = (
                str(format("%.2f" % nucleodity["chi"])) if "chi" in nucleodity else "-"
            )
            nucleodity_entity.molecule = nucleodity["molecule"]
            nucleodity_entity.save()
        except Exception:
            user_request.status = 5
            Log.objects.create(
                type="Error [processing_add_nucleodities] ",
                info=str(user_request.id),
                traceback=traceback.format_exc(),
            ).save()
            user_request.error = "Error during adding nucleodities"
            user_request.save()
            raise GetterException


def add_tetrads(
    quadruplexes, quadruplex_entity, file_data, user_request, cif=False
):
    for tetrad in quadruplexes:
        try:
            quadruplex_entity_tetrad = Tetrad()
            quadruplex_entity_tetrad_metadata = Metadata()
            quadruplex_entity_tetrad_metadata.tetrad_combination = tetrad[
                "gbaClassification"
            ]
            quadruplex_entity_tetrad_metadata.planarity = tetrad["planarityDeviation"]
            quadruplex_entity_tetrad_metadata.onz_class = tetrad["onz"]
            quadruplex_entity_tetrad_metadata.save()
            quadruplex_entity_tetrad.metadata = quadruplex_entity_tetrad_metadata
            quadruplex_entity_tetrad.name = tetrad["id"]
            quadruplex_entity_tetrad.query_id = user_request.id
            quadruplex_entity_tetrad.nt1 = Nucleotide.objects.get(
                query_id=user_request.id, name=tetrad["nt1"]
            )
            quadruplex_entity_tetrad.nt2 = Nucleotide.objects.get(
                query_id=user_request.id, name=tetrad["nt2"]
            )
            quadruplex_entity_tetrad.nt3 = Nucleotide.objects.get(
                query_id=user_request.id, name=tetrad["nt3"]
            )
            quadruplex_entity_tetrad.nt4 = Nucleotide.objects.get(
                query_id=user_request.id, name=tetrad["nt4"]
            )
            quadruplex_entity_tetrad.save()

            get_cetrain_tetrad_file(
                file_data,
                [
                    quadruplex_entity_tetrad.nt1.name,
                    quadruplex_entity_tetrad.nt2.name,
                    quadruplex_entity_tetrad.nt3.name,
                    quadruplex_entity_tetrad.nt4.name,
                ],
                quadruplex_entity_tetrad.tetrad_file,
                user_request.id,
                cif,
            )
            quadruplex_entity_tetrad.save()
            quadruplex_entity.tetrad.add(quadruplex_entity_tetrad)
        except Exception:
            user_request.status = 5
            Log.objects.create(
                type="Error [processing_add_tetrad] ",
                info=str(user_request.id),
                traceback=traceback.format_exc(),
            ).save()
            user_request.error = "Error during adding tetrads"

            user_request.save()
            raise GetterException


def add_loops(loops, quadruplex_entity, user_request):
    for loop in loops:
        try:
            quadruplex_entity_loop = Loop()
            quadruplex_entity_loop.type = loop["type"]
            quadruplex_entity_loop.length = len(loop["nucleotides"])
            quadruplex_entity_loop.save()
            for nucleotide in loop["nucleotides"]:
                quadruplex_entity_loop.nucleotide.add(
                    Nucleotide.objects.get(query_id=user_request.id, name=nucleotide)
                )
            quadruplex_entity_loop.save()
            quadruplex_entity.loop.add(quadruplex_entity_loop)
        except Exception:
            user_request.status = 5
            Log.objects.create(
                type="Error [processing_add_loops] ",
                info=str(user_request.id),
                traceback=traceback.format_exc(),
            ).save()

            user_request.error = "Error during adding loops"
            user_request.save()
            raise GetterException


def add_tetrad_pairs(tetradPairs, helice_entity, user_request):
    for tetrad_pair in tetradPairs:
        try:
            tetrad_pair_entity = TetradPair()
            tetrad_pair_entity.tetrad1 = Tetrad.objects.get(
                name=tetrad_pair["tetrad1"], query_id=user_request.id
            )
            tetrad_pair_entity.tetrad2 = Tetrad.objects.get(
                name=tetrad_pair["tetrad2"], query_id=user_request.id
            )
            tetrad_pair_entity.rise = tetrad_pair["rise"]
            tetrad_pair_entity.twist = tetrad_pair["twist"]
            tetrad_pair_entity.strand_direction = tetrad_pair["direction"]
            tetrad_pair_entity.save()
            helice_entity.tetrad_pair.add(tetrad_pair_entity)
        except Exception:
            user_request.status = 5
            Log.objects.create(
                type="Error [processing_add_tetrad_pairs] ",
                info=str(user_request.id),
                traceback=traceback.format_exc(),
            ).save()

            user_request.error = "Error during adding tetrad pairs"
            user_request.save()
            break


def add_quadruplexes(
    quadruplexes, file_data, helice_entity, user_request, cif=False
):
    for quadruplex in quadruplexes:
        try:
            quadruplex_entity = Quadruplex()
            quadruplex_entity_metadata = Metadata()
            quadruplex_entity_metadata.tetrad_combination = ", ".join(
                str(x) for x in quadruplex["gbaClassification"]
            )
            quadruplex_entity_metadata.onz_class = (
                quadruplex["onzm"] if "onzm" in quadruplex else "-"
            )
            quadruplex_entity_metadata.loopClassification = (
                " ".join(quadruplex["loopClassification"].values())
                if "loopClassification" in quadruplex
                else "-"
            )
            quadruplex_entity_metadata.molecule = file_data.header["head"].upper()

            quadruplex_entity_metadata.save()
            quadruplex_entity.metadata = quadruplex_entity_metadata
            quadruplex_entity.save()

            add_loops(quadruplex["loops"], quadruplex_entity, user_request)
            add_tetrads(
                quadruplex["tetrads"],
                quadruplex_entity,
                file_data,
                user_request,
                cif,
            )
            chains = []
            for tetrad in quadruplex_entity.tetrad.all():
                chains.append(tetrad.nt1.chain)
                chains.append(tetrad.nt2.chain)
                chains.append(tetrad.nt3.chain)
                chains.append(tetrad.nt4.chain)
            tetrads_chains = len(list(set(chains)))
            if tetrads_chains == 1:
                chains_type = "UNI"
            elif tetrads_chains == 2:
                chains_type = "BI"
            elif tetrads_chains == 4:
                chains_type = "TETRA"
            else:
                chains_type = "OTHER"

            quadruplex_entity_metadata.type = chains_type
            quadruplex_entity_metadata.save()
            quadruplex_entity.metadata = quadruplex_entity_metadata
            quadruplex_entity.save()
            helice_entity.quadruplex.add(quadruplex_entity)
        except GetterException:
            raise GetterException
        except Exception:
            user_request.status = 5
            Log.objects.create(
                type="Error [processing_add_quadruplexes] ",
                info=str(user_request.id),
                traceback=traceback.format_exc(),
            ).save()

            user_request.error = "Error during adding quadruplexes"
            user_request.save()
            raise GetterException


def file_downloader(request_key: str, url: str, file_destination: models.FileField):
    while True:
        data_file = NamedTemporaryFile()
        r = requests.get(PROCESSOR_URL + url)
        data_file.write(r.content)
        file_destination.save(name=request_key + ".svg", content=data_file)
        data_file.close()
        if r.status_code == 200:
            svg_count = str(r.content).count("svg")
            if svg_count < 2 :
                file_destination.delete()
            break
        elif r.status_code == 202:
            time.sleep(1)
        else:
            file_destination.delete()
            break


def add_to_queue(user_request):
    base64file = base64.b64encode((open(user_request.structure_body.path, "rb").read()))
    r = requests.post(
        PROCESSOR_URL + "/v1/structure",
        data=json.dumps(
            {
                "pdb_mmcif_b64": str(base64file.decode("utf-8")),
                "strict": user_request.strict,
                "stackingMismatch": user_request.stacking_mismatch,
                "noReorder": user_request.no_reorder,
                "complete2D": user_request.complete_2d,
                "model": user_request.model,
            }
        ),
        headers={"Content-Type": "application/json"},
    )
    try:
        begin = time.time()

        while r.status_code != 200:
            if time.time()-begin > 60:
                user_request = 5
                return False
            time.sleep(2)

        if r.status_code == 200:
            request_key = json.loads(r.content)["structureId"]
            user_request.elTetradoKey = request_key
            user_request.status = 3
            
            if user_request.file_extension == "cif":
                    parser = MMCIFParser(QUIET=True)
                    data = parser.get_structure("str", user_request.structure_body.path)
                    data_header = parser.get_structure("str", user_request.structure_body_original.path)
            elif user_request.file_extension == "pdb":
                    parser = PDBParser(PERMISSIVE=True, QUIET=True)
                    data = parser.get_structure("str", user_request.structure_body.path)
                    data_header = parser.get_structure("str", user_request.structure_body_original.path)
            
            user_request.name =  data_header.header["name"].upper() if "name" in data_header.header else ""
            user_request.structure_method = data_header.header["structure_method"].upper() if "structure_method" in data_header.header and data_header.header['structure_method']!='unknown' else ""
            user_request.idcode = data_header.header["idcode"].upper() if "idcode" in data_header.header else ""

            user_request.save()
            while True:
                r = requests.get(PROCESSOR_URL + "/v1/result/" + request_key)
                if r.status_code == 200:
                    result = json.loads(r.content)

                    add_nucleodities(result["nucleotides"], user_request)

                    for helice in result["helices"]:
                        helice_entity = Helice()
                        helice_entity.save()
                        add_quadruplexes(
                            helice["quadruplexes"],
                            data_header,
                            helice_entity,
                            user_request,
                            user_request.file_extension == "cif",
                        )
                        add_tetrad_pairs(
                            helice["tetradPairs"], helice_entity, user_request
                        )
                        user_request.helice.add(helice_entity)
                    add_base_pairs(result["basePairs"], user_request)
                    user_request.dot_bracket_line1 = result["dotBracket"]["line1"]
                    user_request.dot_bracket_line2 = result["dotBracket"]["line2"]
                    user_request.dot_bracket_sequence = result["dotBracket"]["sequence"]
                    canonical = False
                    non_canonical = False

                    for base_pair in user_request.base_pair.all():
                        if not base_pair.inTetrad and base_pair.canonical:
                            canonical = True
                        if not base_pair.inTetrad and not base_pair.canonical:
                            non_canonical = True
                        if canonical and non_canonical:
                            break

                    file_downloader(
                        request_key,
                        "/v1/varna/"
                        + request_key
                        + "?canonical=false&non-canonical=false",
                        user_request.varna,
                    )
                    if canonical:
                        file_downloader(
                            request_key,
                            "/v1/varna/"
                            + request_key
                            + "?canonical=true&non-canonical=false",
                            user_request.varna_can,
                        )
                    if non_canonical:
                        file_downloader(
                            request_key,
                            "/v1/varna/"
                            + request_key
                            + "?canonical=false&non-canonical=true",
                            user_request.varna_non_can,
                        )
                    if canonical and non_canonical:
                        file_downloader(
                            request_key,
                            "/v1/varna/"
                            + request_key
                            + "?canonical=true&non-canonical=true",
                            user_request.varna_can_non_can,
                        )

                    file_downloader(
                        request_key,
                        "/v1/r-chie/" + request_key + "?canonical=false",
                        user_request.r_chie,
                    )
                    if canonical:
                        file_downloader(
                            request_key,
                            "/v1/r-chie/" + request_key + "?canonical=true",
                            user_request.r_chie_canonical,
                        )
                    file_downloader(
                        request_key,
                        "/v1/draw-tetrado/" + request_key,
                        user_request.draw_tetrado,
                    )

                    user_request.status = 4
                    user_request.save()

                    user_request.cached_result = compose(user_request.id)
                    user_request.save()
                    payload = {
                        "image": "https://webtetrado.cs.put.poznan.pl/static/logo.svg",
                        "tag": "Complete",
                        "url": "https://webtetrado.cs.put.poznan.pl/result/"
                        + str(user_request.hash_id),
                        "title": "WebTetrado notification ",
                        "text": "Your request "
                        + str(user_request.hash_id)
                        + " is completed",
                    }
                    # payload = {"head": "Hey", "body": "Hello World"}
                    for subscriber in TetradoRequest.objects.get(
                        id=user_request.id
                    ).push_notification.all():
                        send_to_subscription(subscriber, json.dumps(payload), ttl=3600)
                    break
                if r.status_code == 500:
                    user_request.status = 5
                    user_request.error = "ElTetrado processor error"
                    user_request.save()
                    break
                time.sleep(1)
            return True
        else:
            return "Failed to get eltetrado id" 
    except GetterException:
        Log.objects.create(
            type="Error [processing] ",
            info=str(user_request.id),
            traceback=traceback.format_exc(),
        ).save()
        user_request.save()
    except:
        user_request.status = 5
        user_request.error = "Unknown server failure"

        Log.objects.create(
            type="Error [processing] ",
            info=str(user_request.id),
            traceback=traceback.format_exc(),
        ).save()
        user_request.save()
