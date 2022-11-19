import { Table } from "antd";
import { UseAppContext } from "../../AppContextProvider";
import { base_pair } from "../../types/RestultSet";

interface BasePairTableArguents {
    value: base_pair[];
    id: boolean;
}
export default function BasePairTable(props: BasePairTableArguents) {
    const context = UseAppContext();
    const columns_base_pairs = [
        {
            title: "Number",
            dataIndex: "number",
            key: "number",
            sorter: (a: any, b: any) => {
                return a.number - b.number;
            },
        },
        {
            title: "Stericity",
            dataIndex: "stericity",
            key: "stericity",
        },
        {
            title: "3'-edge",
            dataIndex: "edge3",
            key: "edge3",
        },
        {
            title: "5'-edge",
            dataIndex: "edge5",
            key: "edge5",
        },
        {
            title: "Nucleotide 1",
            dataIndex: "nt1",
            key: "nt1",
        },
        {
            title: "Nucleotide 2",
            dataIndex: "nt2",
            key: "nt2",
        },
        {
            title: "In tetrad",
            dataIndex: "in_tetrad",
            key: "in_tetrad",
            sorter: (a: any, b: any) => {
                if (a.in_tetrad == b.in_tetrad) return 0;
                if (a.in_tetrad) return 1;
                else return -1;
            },
            render: (be: boolean) => <>{be ? <u>✅</u> : ""}</>,
        },
    ];
    return (
        <>
            <h2 id={props.id ? "base-pairs" : ""} style={{ marginTop: "40px" }}>
                Base pairs
            </h2>
            <Table
                style={{ textAlign: "center" }}
                dataSource={props.value}
                columns={columns_base_pairs}
                scroll={
                    !context.viewSettings.isCompressedViewNeeded
                        ? { x: "auto" }
                        : { x: "100%" }
                }
            />
        </>
    );
}
