def add_necessary_columns_cif(file_absolute_path: str) -> None:
    fail_brake = False
    output = []

    with open(file_absolute_path, "r") as file:
        lines = file.readlines()
        i = 0
        while i < len(lines):
            foo = lines[i].split()
            if foo[0] == "ATOM" or foo[0] == "HETATM":
                foo.insert(17, foo[3])
                foo.insert(16, foo[5])
                foo.insert(15, "?")
                if foo[3][0] == "'" and foo[3][-1] == "'":
                    temp_str = list(foo[3])
                    temp_str[0] = '"'
                    temp_str[-1] = '"'
                    foo[3] = "".join(temp_str)
                if foo[19][0] == "'" and foo[19][-1] == "'":
                    temp_str = list(foo[19])
                    temp_str[0] = '"'
                    temp_str[-1] = '"'
                    foo[19] = "".join(temp_str)
                output.append([z for z in foo])
            elif foo[0] == "_atom_site.B_iso_or_equiv":
                output.append([z for z in foo])
                output.append(["_atom_site.pdbx_formal_charge"])
            elif foo[0] == "_atom_site.auth_seq_id":
                output.append([z for z in foo])
                output.append(["_atom_site.auth_comp_id"])
            elif foo[0] == "_atom_site.auth_asym_id":
                output.append([z for z in foo])
                output.append(["_atom_site.auth_atom_id"])
            elif (
                "_atom_site.pdbx_formal_charge" in foo[0]
                or "_atom_site.auth_atom_id" in foo[0]
                or "_atom_site.auth_comp_id" in foo[0]
            ):
                fail_brake = True
                break
            else:
                output.append([lines[i].replace("\n", "")])
            i += 1

    if not fail_brake:
        col_width = [0 for i in range(21)]
        first_row = 0
        to_file = []

        for i in range(len(output)):
            if len(output[i]) > 0 and (
                output[i][0] == "ATOM" or output[i][0] == "HETATM"
            ):
                first_row = i
                break

        for j in range(first_row, len(output) - 1):
            for i in range(len(output[j])):
                col_width[i] = max(col_width[i], len(output[j][i]))

        for i in range(len(output)):
            if output[i][0] == "ATOM" or output[i][0] == "HETATM":
                foo = ""
                for j in range(len(output[i])):
                    foo += ("{0: <" + str(col_width[j] + 1) + "}").format(output[i][j])
                to_file.append(foo)
            else:
                to_file.append(output[i][0])
        with open(file_absolute_path, "w") as file:
            file.writelines("".join(map(lambda x: x + "\n", to_file)))
