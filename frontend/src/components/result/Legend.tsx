import React from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;
export class VisualisationLegend extends React.Component {
  render() {
    return (
      <Collapse defaultActiveKey={1}>
        <Panel header="Legend" key="1">
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
                <th>O+</th>
                <th>O-</th>
                <th>N+</th>
                <th>N-</th>
                <th>Z+</th>
                <th>Z-</th>
              </tr>
              <tr>
                <td style={{ backgroundColor: "#1f78b4", height: "10px" }}></td>
                <td style={{ backgroundColor: "#a6cee3", height: "10px" }}></td>
                <td style={{ backgroundColor: "#33a02c", height: "10px" }}></td>
                <td style={{ backgroundColor: "#b2df8a", height: "10px" }}></td>
                <td style={{ backgroundColor: "#ff7f00", height: "10px" }}></td>
                <td style={{ backgroundColor: "#fdbf6f", height: "10px" }}></td>
              </tr>
            </tbody>
          </table>
        </Panel>
      </Collapse>
    );
  }
}
