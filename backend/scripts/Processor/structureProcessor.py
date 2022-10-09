from Bio.PDB.PDBParser import PDBParser
from Bio.PDB import PDBIO
from Bio.PDB import MMCIFParser
from Bio.PDB.mmcifio import MMCIFIO


def add_symetry_data_cif(full_file_path, end_file_path):
    loop = False
    section_sep = False
    headers = [
        "_pdbx_struct_assembly",
        "_pdbx_struct_assembly_gen",
        "_pdbx_struct_assembly_prop",
        "_pdbx_struct_oper_list",
    ]
    output = ["data_pdb\n", "#\n"]
    with open(full_file_path, "r") as file:
        lines = file.readlines()
        for line in lines:
            line_splited = line.split()
            if (
                len(line_splited) > 0
                and not (loop or section_sep)
                and line_splited[0].split(".")[0] in headers
            ):
                if len(line_splited) == 2:
                    section_sep = True
                elif len(line_splited) == 1:
                    loop = True
                    output.append("loop_\n")
                output.append(line)

            elif loop or section_sep:
                if line_splited[0] == "#":
                    loop = False
                    section_sep = False
                    output.append("#\n")
                elif loop or (
                    section_sep and len(line_splited) == 2 and line[0] != ";"
                ):
                    output.append(line)

    with open(end_file_path, "r") as file:
        output.extend(file.readlines()[2:])

    with open(end_file_path, "w") as file:
        file.writelines("".join(map(lambda x: x, output)))


def add_symetry_data_pdb(full_file_path, end_file_path):
    with open(full_file_path, "r") as file:
        lines = file.readlines()
        was_350 = False
        output = []
        for line in lines:
            row = line.split()
            if row[0] == "REMARK" and (row[1] == "300" or row[1] == "350"):
                output.append(line)
                if row[1] == "350":
                    was_350 = True
            elif was_350:
                break
    with open(end_file_path, "r") as file:
        lines = file.readlines()
        output.extend(lines)
    with open(end_file_path, "w") as file:
        file.writelines("".join(map(lambda x: x, output)))

def add_necessary_column_cif(end_file_name):
    fail_brake = False
    output = []

    with open(end_file_name, "r") as file:
        lines = file.readlines()
        i = 0
        while i < len(lines):
            foo = lines[i].split()
            if foo[0] == 'ATOM' or foo[0] == 'HETATM':
                foo.insert(17, foo[3])
                foo.insert(16, foo[5])
                foo.insert(15, '?')
                if foo[3][0]=='\'' and foo[3][-1]=='\'':
                    temp_str = list(foo[3])
                    temp_str[0]='\"'
                    temp_str[-1]='\"'
                    foo[3]=''.join(temp_str)
                if foo[19][0]=='\'' and foo[19][-1]=='\'':
                    temp_str = list(foo[19])
                    temp_str[0]='\"'
                    temp_str[-1]='\"'
                    foo[19]=''.join(temp_str)
                output.append([z for z in foo])
            elif foo[0] == '_atom_site.B_iso_or_equiv':
                output.append([z for z in foo])
                output.append(['_atom_site.pdbx_formal_charge'])
            elif foo[0] == '_atom_site.auth_seq_id':
                output.append([z for z in foo])
                output.append(['_atom_site.auth_comp_id'])
            elif foo[0] == '_atom_site.auth_asym_id':
                output.append([z for z in foo])
                output.append(['_atom_site.auth_atom_id'])
            elif '_atom_site.pdbx_formal_charge' in foo[0] or '_atom_site.auth_atom_id' in foo[0] or '_atom_site.auth_comp_id' in foo[0]:
                fail_brake = True
                break
            else:
                output.append([lines[i].replace('\n','')])
            i += 1

    if not fail_brake:
        col_width = [0 for i in range(21)]
        first_row = 0
        to_file = []

        for i in range(len(output)):
            if len(output[i])>0 and (output[i][0] == 'ATOM' or output[i][0] == 'HETATM'):
                first_row = i
                break

        for j in range(first_row, len(output) - 1):
            for i in range(len(output[j])):
                col_width[i] = max(col_width[i], len(output[j][i]))

        for i in range(len(output)):
            if output[i][0] == 'ATOM' or output[i][0] == 'HETATM':
                foo = ''
                for j in range(len(output[i])):
                    foo += ('{0: <' + str(col_width[j] + 1) + '}').format(output[i][j])
                to_file.append(foo)
            else:
                to_file.append(output[i][0])
        with open(end_file_name, "w") as file:
            file.writelines(''.join(map(lambda x: x + '\n', to_file)))


def cif_filter_model(file_name, model_no):  # string, list string, string
    structure = MMCIFParser(QUIET=True).get_structure("str", str(file_name))[
        int(model_no) - 1
    ]

    io = MMCIFIO()
    io.set_structure(structure)
    io.save(str(file_name))
    add_necessary_column_cif(str(file_name))

def pdb_filter_model(file_name, model_no):  # string, list string, string
    structure = PDBParser(PERMISSIVE=1, QUIET=True).get_structure(
        "str", str(file_name)
    )[int(model_no) - 1]
    io = PDBIO()
    io.set_structure(structure)
    io.save(str(file_name))
