import { Table } from "antd";
import { UseAppContext } from "../../AppContextProvider";
import { tetrad_pair } from "../../types/RestultSet";
import { JsonToCsvButton } from "../services/JsonToCsvButton";

interface TetradPariTableArguments {
    value: tetrad_pair[];
    id: boolean;
}

export default function TetradPairTable(props: TetradPariTableArguments) {
    const context = UseAppContext();
    const columns_tetrad_pairs = [
        {
            title: "Number",
            dataIndex: "number",
            key: "number",
        },
        {
            title: "Tetrad sequences",
            dataIndex: "pair",
            key: "pair",
        },
        {
            title: "Twist [°]",
            dataIndex: "twist",
            key: "twist",
        },
        {
            title: "Rise [Å]",
            dataIndex: "rise",
            key: "rise",
        },
        {
            title: "Strands",
            dataIndex: "strand_direction",
            key: "strand_direction",
        },
    ];
    return (
        <>
            <h2 id={props.id ? "tetrad-pairs" : ""} style={{ marginTop: "40px" }}>
                Tetrad pairs
            </h2>
            <Table
                style={{ textAlign: "center" }}
                dataSource={props.value}
                scroll={
                    !context.viewSettings.isCompressedViewNeeded
                        ? { x: "auto" }
                        : { x: "100%" }
                }
                columns={columns_tetrad_pairs}
            />
            <div className="horizontal-center">
                {JsonToCsvButton(props.value, ['number', 'pair', 'twist', 'rise', 'strand_direction'], ['Number', 'Tetrad sequence', 'Twist [°]', 'Rise [Å]', 'Strands'], 'tetrad_pair_results')}
            </div>
        </>
    );
}
