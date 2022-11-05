def add_symetry_data_cif(
    file_with_symetry_operators_absolute_path: str, result_file_absolute_path: str
) -> None:
    loop = False
    section_sep = False
    headers = [
        "_pdbx_struct_assembly",
        "_pdbx_struct_assembly_gen",
        "_pdbx_struct_assembly_prop",
        "_pdbx_struct_oper_list",
    ]
    output = ["data_pdb\n", "#\n"]
    with open(file_with_symetry_operators_absolute_path, "r") as file:
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

    with open(result_file_absolute_path, "r") as file:
        output.extend(file.readlines()[2:])

    with open(result_file_absolute_path, "w") as file:
        file.writelines("".join(map(lambda x: x, output)))


def add_symetry_data_pdb(
    file_with_symetry_operators_absolute_path: str, result_file_absolute_path: str
) -> None:
    with open(file_with_symetry_operators_absolute_path, "r") as file:
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
    with open(result_file_absolute_path, "r") as file:
        lines = file.readlines()
        output.extend(lines)
    with open(result_file_absolute_path, "w") as file:
        file.writelines("".join(map(lambda x: x, output)))


