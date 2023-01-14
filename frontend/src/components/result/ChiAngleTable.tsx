import { Table } from "antd";
import { UseAppContext } from "../../AppContextProvider";
import { chi_angle_value } from "../../types/RestultSet";
import { JsonToCsvButton } from "../services/JsonToCsvButton";

interface ChiAngleTableArguments {
    value: chi_angle_value[];
    id: boolean;
}
export default function ChiAngleTable(props: ChiAngleTableArguments) {
    const context = UseAppContext();
    const columns_chi = [
        {
            title: "Tetrad number",
            dataIndex: "number",
            key: "number",
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
            title: "Nucleotide 3",
            dataIndex: "nt3",
            key: "nt3",
        },
        {
            title: "Nucleotide 4",
            dataIndex: "nt4",
            key: "nt4",
        },
    ];
    return (
        <>
            <h2 id={props.id ? "chi-angle" : ""} style={{ marginTop: "40px" }}>
                Chi angles
            </h2>
            <Table
                style={{ textAlign: "center" }}
                dataSource={props.value}
                columns={columns_chi}
                scroll={
                    !context.viewSettings.isCompressedViewNeeded
                        ? { x: "auto" }
                        : { x: "100%" }
                }
            />
            <div className="horizontal-center">
                {JsonToCsvButton(props.value, ['number', 'nt1', 'nt2', 'nt3', 'nt4'], ['Tetrad number', 'Nucleotide 1', 'Nucleotide 2', 'Nucleotide 3', 'Nucleotide 4'], 'chi_angle_results')}
            </div>

        </>
    );
}
