
from re import T
from backend.models import Nucleotide, TetradoRequest

import json


def compose(orderId):
    result={}
    try:
        tetrado_request = TetradoRequest.objects.get(id=orderId)
    except Exception:
        return '{"status":0,"helice":[],"base_pair":[],"nucleotide":[]}'
    result['name']=tetrado_request.name
    result['status']=tetrado_request.status
    result['structure_method']=tetrado_request.structure_method
    result['idcode']=tetrado_request.idcode
    result['g4_limited']=tetrado_request.g4_limited
    result['structure_file']=tetrado_request.structure_body.url
    if tetrado_request.varna:
        result['varna']=tetrado_request.varna.url
    if tetrado_request.r_chie:
        result['r_chie']=tetrado_request.r_chie.url
    if tetrado_request.draw_tetrado:
        result['draw_tetrado']=tetrado_request.draw_tetrado.url  
    result['base_pair']=[]
    counter=1
    for base_pair in tetrado_request.base_pair.all():
        base_pair_single={}
        base_pair_single['number']=counter
        base_pair_single['edge3']=base_pair.edge3
        base_pair_single['edge5']=base_pair.edge5
        base_pair_single['nt1']=base_pair.nt1.name
        base_pair_single['nt2']=base_pair.nt2.name
        base_pair_single['stericity']=base_pair.stericity
        result['base_pair'].append(base_pair_single)
        counter+=1

    result['helice']=[]
    for helice in tetrado_request.helice.all():
        counter=1
        helice_result={}
        helice_result['quadruplex']=[]
        helice_result['tetrad_pair']=[]
        for quadruplex in helice.quadruplex.all():
            quadruplex_single={}
            quadruplex_single['number']=counter
            quadruplex_single['molecule']=quadruplex.metadata.molecule
            quadruplex_single['method']=quadruplex.metadata.method
            quadruplex_single['onz_class']=quadruplex.metadata.onz_class
            quadruplex_single['tetrad_combination']=quadruplex.metadata.tetrad_combination
            quadruplex_single['loopClassification']=quadruplex.metadata.loopClassification
            quadruplex_single['structure_dot_bracked']=quadruplex.metadata.structure_dot_bracked
            quadruplex_single['tetrads_no']=quadruplex.tetrad.count()
            quadruplex_single['tetrad']=[]
            quadruplex_single['chi_angle_value']=[]
            counter_tetrad=1
            for tetrad in quadruplex.tetrad.all():
                tetrad_quadruplex_single={}
                tetrad_quadruplex_single['number']=counter_tetrad
                tetrad_quadruplex_single['name']=tetrad.name
                tetrad_quadruplex_single['nucleotities']=[tetrad.nt1.name,tetrad.nt2.name,tetrad.nt3.name,tetrad.nt4.name]
                tetrad_quadruplex_single['sequence']=tetrad.nt1.symbol+tetrad.nt2.symbol+tetrad.nt3.symbol+tetrad.nt4.symbol
                tetrad_quadruplex_single['onz_class']=tetrad.metadata.onz_class
                tetrad_quadruplex_single['planarity']=format('%.2f'%tetrad.metadata.planarity)
                tetrad_quadruplex_single['file']=tetrad.tetrad_file.url
                quadruplex_single['tetrad'].append(tetrad_quadruplex_single)
                chi_angle_value_tetrad_quadruplex_single={}
                chi_angle_value_tetrad_quadruplex_single['number']=counter_tetrad
                chi_angle_value_tetrad_quadruplex_single['nt1']=str(format('%.2f'%tetrad.nt1.chi_angle))+ '° / '+tetrad.nt1.glycosidicBond
                chi_angle_value_tetrad_quadruplex_single['nt2']=str(format('%.2f'%tetrad.nt2.chi_angle))+ '° / '+tetrad.nt2.glycosidicBond
                chi_angle_value_tetrad_quadruplex_single['nt3']=str(format('%.2f'%tetrad.nt3.chi_angle))+ '° / '+tetrad.nt3.glycosidicBond
                chi_angle_value_tetrad_quadruplex_single['nt4']=str(format('%.2f'%tetrad.nt4.chi_angle))+ '° / '+tetrad.nt4.glycosidicBond
                quadruplex_single['chi_angle_value'].append(chi_angle_value_tetrad_quadruplex_single)
                counter_tetrad+=1
                
            counter_loop=1
            quadruplex_single['loop']=[]
            for loop in quadruplex.loop.all():
                loop_quadruplex_single={}
                loop_quadruplex_single['number']=counter_loop
                loop_quadruplex_single['short_sequence']=''.join([nucleotide.symbol for nucleotide in loop.nucleotide.all()])
                loop_quadruplex_single['full_sequence']=', '.join([nucleotide.name for nucleotide in loop.nucleotide.all()])
                loop_quadruplex_single['length']=loop.length
                loop_quadruplex_single['type']=loop.type
                quadruplex_single['loop'].append(loop_quadruplex_single)
                counter_loop+=1
            helice_result['quadruplex'].append(quadruplex_single)
            counter+=1
        counter=1
        for tetrad_pair in helice.tetrad_pair.all():
            tetrad_pair_single={}
            tetrad_pair_single['number']=counter
            tetrad_pair_single['pair']=tetrad_pair.tetrad1.name+' | '+tetrad_pair.tetrad2.name
            tetrad_pair_single['rise']=format('%.2f'%tetrad_pair.rise)
            tetrad_pair_single['twist']=format('%.2f'%tetrad_pair.twist)
            tetrad_pair_single['strand_direction']=tetrad_pair.strand_direction
            helice_result['tetrad_pair'].append(tetrad_pair_single)
            counter+=1
        result['helice'].append(helice_result)

    result['nucleotide']=[]
    counter=1
    for nucleotide in Nucleotide.objects.filter(query_id=orderId):
        nucleotide_single={}
        nucleotide_single['number']=counter
        nucleotide_single['symbol']=nucleotide.symbol
        nucleotide_single['name']=nucleotide.name
        nucleotide_single['glycosidicBond']=nucleotide.glycosidicBond
        nucleotide_single['chi_angle']=format('%.2f'%nucleotide.chi_angle)
        result['nucleotide'].append(nucleotide_single)
        counter+=1
    
    return json.dumps(result)