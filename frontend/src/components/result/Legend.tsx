import React from "react";
import { Collapse, Tooltip, Image } from "antd";

const { Panel } = Collapse;
export class VisualisationLegend extends React.Component {
  render() {
    return (
      <Collapse defaultActiveKey={1}>
        <Panel header="Color codes" key="1">
          <table
            style={{
              verticalAlign: "center",
              width: "100%",
              tableLayout: "fixed",
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            <tbody>
              <tr>
                <th>
                  <Tooltip title={<Image src={require('../../assets/images/oplus.svg')} />} color={'#ffffff'}>
                    <div className="vertical-align">
                      <span>O+</span>
                      <div style={{ backgroundColor: "#1f78b4", height: "10px" }}></div>
                    </div>
                  </Tooltip>
                </th>
                <th>
                  <Tooltip title={<Image src={require('../../assets/images/ominus.svg')} />} color={'#ffffff'}>
                    <div className="vertical-align">
                      <span>O-</span>
                      <div style={{ backgroundColor: "#a6cee3", height: "10px" }}></div>
                    </div>
                  </Tooltip>
                </th>
                <th>
                  <Tooltip title={<Image src={require('../../assets/images/nplus.svg')} />} color={'#ffffff'}>
                    <div className="vertical-align">
                      <span>N+</span>
                      <div style={{ backgroundColor: "#33a02c", height: "10px" }}></div>
                    </div>
                  </Tooltip>
                </th>
                <th>
                  <Tooltip title={<Image src={require('../../assets/images/nminus.svg')} />} color={'#ffffff'}>
                    <div className="vertical-align">
                      <span>N-</span>
                      <div style={{ backgroundColor: "#b2df8a", height: "10px" }}></div>
                    </div>
                  </Tooltip>
                </th>
                <th>
                  <Tooltip title={<Image src={require('../../assets/images/zplus.svg')} />} color={'#ffffff'}>
                    <div className="vertical-align">
                      <span>Z+</span>
                      <div style={{ backgroundColor: "#ff7f00", height: "10px" }}></div>
                    </div>
                  </Tooltip>
                </th>
                <th>
                  <Tooltip title={<Image src={require('../../assets/images/zminus.svg')} />} color={'#ffffff'}>
                    <div className="vertical-align">
                      <span>Z-</span>
                      <div style={{ backgroundColor: "#fdbf6f", height: "10px" }}></div>
                    </div>
                  </Tooltip>
                </th>
              </tr>
            </tbody>
          </table>
        </Panel>
      </Collapse >
    );
  }
}
