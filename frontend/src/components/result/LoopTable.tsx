import { Table } from "antd";
import { UseAppContext } from "../../AppContextProvider";
import { loop } from "../../types/RestultSet";
import { JsonToCsvButton } from "../services/JsonToCsvButton";

interface LoopTableArguments {
    value: loop[];
    id: boolean;
}

export default function LoopTable(props: LoopTableArguments) {
    const context = UseAppContext();
    const columns_loops = [
        {
            title: "Number",
            dataIndex: "number",
            key: "number",
        },
        {
            title: "Short sequence",
            dataIndex: "short_sequence",
            key: "short_sequence",
        },
        {
            title: "Full sequence",
            dataIndex: "full_sequence",
            key: "full_sequence",
        },
        {
            title: "Loop length",
            dataIndex: "length",
            key: "length",
        },
        {
            title: "Loop type",
            dataIndex: "type",
            key: "type",
        },
    ];
    return (
        <>
            {props.value.length > 0 ? <>
                <h2 id={props.id ? "loops" : ""} style={{ marginTop: "40px" }}>
                    Loops
                </h2>
                <Table
                    style={{ textAlign: "center" }}
                    dataSource={props.value}
                    columns={columns_loops}
                    scroll={
                        !context.viewSettings.isCompressedViewNeeded
                            ? { x: "auto" }
                            : { x: "100%" }
                    }
                />
                <div className="horizontal-center">
                    {JsonToCsvButton(props.value, ['number', 'short_sequence', 'full_sequence', 'length', 'type'], ['Number', 'Short sequence', 'Full sequence', 'Loop length', 'Loop type'], 'loop_results')}
                </div>
            </> : <></>}
        </>
    );
}
