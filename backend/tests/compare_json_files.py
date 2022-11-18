import json


def compare(file_1: str, file_2: str, ignore):
    file_1_read = open(file_1, 'rb')
    file_2_read = open(file_2, 'rb')
    file_1_dict = json.load(file_1_read)
    file_2_dict = json.load(file_2_read)
    keys = list(file_1_dict.keys())
    keys.extend(list(file_2_dict.keys()))
    try:
        for key in keys:
            if not key in ignore:
                if file_1_dict[key] != file_2_dict[key]:
                    return False
    except BaseException:
        return False
    return True
