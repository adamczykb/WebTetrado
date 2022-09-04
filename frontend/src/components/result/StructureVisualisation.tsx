import { Button, Image,Switch, Tooltip} from "antd";
import config from "../../config.json";
import { DownloadOutlined } from "@ant-design/icons";
import { quadruplex, result_values } from "../../types/RestultSet";
import { MolStarWrapper } from "../molstar/MolStarWrapper";
import { VisualisationLegend } from "./Legend";
import { visualsation_switch_result } from "../../types/RestultSet";

function downloadFile(type: any, url: any) {
    const requestOptions = {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    };
    fetch(url, requestOptions)
        .then((res) => res.blob())
        .then((blob) => {
            let url = URL.createObjectURL(blob);
            let pom = document.createElement("a");
            pom.setAttribute("href", url);
            pom.setAttribute("download", type);
            pom.click();
        })
}
function varna_url(resultSet:result_values,visualisationSwitchOptions:visualsation_switch_result){

    if(visualisationSwitchOptions.varna_can){
        if(visualisationSwitchOptions.varna_non_can){
            return config.SERVER_URL + resultSet.varna_can_non_can;
        }else{
            return config.SERVER_URL + resultSet.varna_can;
        }
    }else{
        if(visualisationSwitchOptions.varna_non_can){
            return config.SERVER_URL +  resultSet.varna_non_can
        }else{
            return config.SERVER_URL + resultSet.varna;
        }
    }
}
function r_chie_url(resultSet:result_values,visualisationSwitchOptions:visualsation_switch_result){
    if(visualisationSwitchOptions.r_chie_canonical){
        return config.SERVER_URL + resultSet.r_chie_canonical;
    }else{
        return config.SERVER_URL + resultSet.r_chie;
    }
}
export const StructureVisualisation = (data: quadruplex, resultSet: result_values,visualisationSwitchOptions:visualsation_switch_result, setSwitchOptions:any) => {
    const extension = resultSet.structure_file.split(".").splice(-1)[0];
    return (
        <div id={"result-visualization"}>
            <div
                style={{
                    display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                }}
            >
                <div hidden={resultSet.varna==''} className="result-visualization">
                    <h2>VARNA</h2>
                    <div
                        style={{ padding: "20px", flexDirection: "column" }}
                        className={"vertical-center"}
                    >
                        <Tooltip title={resultSet.varna_can==''?'The analyzed quadruplex does not have any canonical base pairs outside of tetrads':''}>
                            <p>Show canonical base pairs outside tetrads: <Switch checked={visualisationSwitchOptions.varna_can} checkedChildren="Yes" unCheckedChildren="No" disabled={resultSet.varna_can==''} onChange={() =>
                                setSwitchOptions({
                                    ...visualisationSwitchOptions,
                                    varna_can:!visualisationSwitchOptions.varna_can
                                })}
                            /></p>
                </Tooltip>
                <Tooltip title={resultSet.varna_non_can==''?'The analyzed quadruplex does not have any non-canonical base pairs outside of tetrads':''}>
                    <p>Show non-canonical base pairs outside tetrads: <Switch checked={visualisationSwitchOptions.varna_non_can}  checkedChildren="Yes" unCheckedChildren="No" disabled={resultSet.varna_non_can==''} onChange={() =>
                        setSwitchOptions({
                            ...visualisationSwitchOptions,
                            varna_non_can:!visualisationSwitchOptions.varna_non_can
                        })}
                    /></p>
        </Tooltip>
        <Image
            className="two-d-image"
            src={varna_url(resultSet, visualisationSwitchOptions)}
        />
        <br />
        <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            style={{ marginTop: "15px" }}
            size={"large"}
            onClick={() =>{
                if(visualisationSwitchOptions.varna_non_can && visualisationSwitchOptions.varna_can){
                    downloadFile("varna_canonical_and_non_canonical.svg", varna_url(resultSet, visualisationSwitchOptions))
                }  
                if(!visualisationSwitchOptions.varna_non_can && visualisationSwitchOptions.varna_can){
                    downloadFile("varna_canonical.svg",varna_url(resultSet, visualisationSwitchOptions) )
                }
                if(visualisationSwitchOptions.varna_non_can && !visualisationSwitchOptions.varna_can){
                    downloadFile("varna_non_canonical.svg",varna_url(resultSet, visualisationSwitchOptions))
                }
                if(!visualisationSwitchOptions.varna_non_can && !visualisationSwitchOptions.varna_can){
                    downloadFile("varna.svg", varna_url(resultSet, visualisationSwitchOptions))
                } 
            }
            }
        >
            Download
        </Button>
    </div>
</div>
<div hidden={resultSet.r_chie==''} className="result-visualization">
    <h2>R-chie</h2>
    <div
        style={{ padding: "20px", flexDirection: "column" }}
        className={"vertical-center"}
    > 
    <Tooltip title={resultSet.r_chie_canonical==''?'The analyzed quadruplex does not have any canonical base pairs outside of tetrads':''}>
        <p>Show canonical base pairs outside tetrads: <Switch checked={visualisationSwitchOptions.r_chie_canonical} checkedChildren="Yes" unCheckedChildren="No" disabled={resultSet.r_chie_canonical==''}
            onChange={() =>
                setSwitchOptions({
                    ...visualisationSwitchOptions,
                    r_chie_canonical:!visualisationSwitchOptions.r_chie_canonical
                })}
            /></p>
</Tooltip>
<div 
style={{marginTop:'38px'}}>

            </div>
            <Image
                className="two-d-image"
                src={r_chie_url(resultSet, visualisationSwitchOptions)}            
            />
            <br />
            <Button
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                style={{ marginTop: "15px" }}
                size={"large"}
                onClick={() =>{
                    downloadFile("r_chie.svg", config.SERVER_URL + resultSet.r_chie)
                    if(!visualisationSwitchOptions.r_chie_canonical){
                        downloadFile("r_chie.svg", r_chie_url(resultSet, visualisationSwitchOptions))
                    }
                    if(visualisationSwitchOptions.r_chie_canonical){
                        downloadFile("r_chie_canonical.svg", r_chie_url(resultSet, visualisationSwitchOptions))
                    }  
                }
                }
            >
                Download
            </Button>
        </div>
    </div>
    <div hidden={resultSet.draw_tetrado==''} className="result-visualization">
        <h2>DrawTetrado (2.5D structure)</h2>
        <div
            style={{ padding: "20px", flexDirection: "column" }}
            className={"vertical-center"}
        >
            <div
                style={{marginTop:'76px'}}></div>
            <Image
                className="two-d-image"
                src={config.SERVER_URL + resultSet.draw_tetrado}
            />
            <br />

            <Button
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                style={{ marginTop: "15px" }}
                size={"large"}
                onClick={() =>
                    downloadFile(
                    "drawTetrado.svg",
                    config.SERVER_URL + resultSet.draw_tetrado
                    )
                }
            >
                Download
            </Button>
        </div>
    </div>
</div>
<div style={{ display: "block", marginTop: "30px" }}>
    {resultSet.structure_file != "" ? (
        <div>
            <h2>Mol*</h2>
            <MolStarWrapper
                structure_file={config.SERVER_URL + resultSet.structure_file}
                tetrads={data.tetrad}
            />
            <br />
            <VisualisationLegend />
            <br />
            <div className="horizontal-center" style={{ width: "100%" }}>
                <Button
                    type="primary"
                    shape="round"
                    icon={<DownloadOutlined />}
                    style={{ marginTop: "15px" }}
                    size={"large"}
                    onClick={() =>
                        downloadFile(
                        "structure." + extension,
                        config.SERVER_URL + resultSet.structure_file
                        )
                    }
                >
                    Download
                </Button>
            </div>
        </div>
    ) : (
        <></>
    )}
</div>
    </div>
);
};
