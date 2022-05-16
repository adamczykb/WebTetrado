export type base_pair = {
    number: number;
    edge3: string;
    edge5: string;
    nt1: string;
    nt2: string;
    stericity: string;
};

export type chi_angle_value = {
    number: number;
    nt1: string;
    nt2: string;
    nt3: string;
    nt4: string;
};

export type tetrad = {
    number: number;
    name: string;
    sequence: string;
    nucleotities:string[];
    onz_class: string;
    planarity: number;
    file: string;
};
export type loop = {
    number: number;
    short_sequence: string;
    full_sequence: string;
    type: string;
    length: number;
};
export type quadruplex = {
    number: number;
    molecule: string;
    method: string;
    onz_class: string;
    tetrad_combination: string;
    loopClassification: string;
    structure_dot_bracked: string;
    tetrads_no: number;
    tetrad: tetrad[];
    chi_angle_value: chi_angle_value[];
    type: string;
    loop: loop[];
};
export type tetrad_pair = {
    number: number;
    tetrad1: string;
    tetrad2: string;
    rise: number;
    twist: number;
    strand_direction: string;
};
export type nucleotide = {
    number: number;
    symbol: string;
    name: string;
    nucleotities:string[];
    glycosidicBond: string;
    chi_angle: string;
};
export type helice = {
    quadruplex: quadruplex[];
    tetrad_pair: tetrad_pair[];
};
export type result_values = {
    name: string;
    dot_bracket:dot_bracket_values;
    status: number;
    error_message:string;
    structure_method: string;
    structure_file:string;
    g4_limited:boolean;
    idcode: string;
    varna: string;
    r_chie: string;
    draw_tetrado: string;
    base_pair: base_pair[];
    helice: helice[];
    nucleotide: nucleotide[];
};
export type dot_bracket_values={
    line1:string;
    line2:string;
    sequence:string;

}