import { Collapse, Image } from "antd";
const { Panel } = Collapse;

export const WebbDaSilvaClassificationHelpSection = () => {
  let webbDaSilvaRoman = [
    "Ia",
    "Ib",
    "IIa",
    "IIb",
    "IIIa",
    "IIIb",
    "IVa",
    "IVb",
    "Va",
    "Vb",
    "VIa",
    "VIb",
    "VIIa",
    "VIIb",
    "VIIIa",
    "VIIIb",
  ];
  return (
    <>
      <Collapse defaultActiveKey={1}>
        <Panel header="2.1. Chi angle" key="1">
          <div
            className="horizontal-center"
            style={{
              flexWrap: "wrap",
            }}
            id={"webb_chi_angle"}
          >
            {Array.from(Array(13).keys()).map((v) => {
              return Array.from(["a", "b"]).map((v1) => {
                return (
                  <div className="da-silva-chi-row">
                    <h3 style={{ paddingTop: "10px" }}>
                      {v + 1}
                      {v1}
                    </h3>
                    <div className="da-silva-chi-column">
                      <Image
                        src={require("../../assets/da-silva/" +
                          (v + 1).toString() +
                          v1 +
                          ".svg")}
                        height="100%"
                      />
                    </div>
                  </div>
                );
              });
            })}
          </div>
        </Panel>
      </Collapse>
      <br />
      <Collapse defaultActiveKey={1}>
        <Panel header="2.2. Loop progression" key="1">
          <div
            className="horizontal-center"
            style={{
              flexWrap: "wrap",
            }}
            id={"webb_loop_progression"}
          >
            {webbDaSilvaRoman.map((v) => {
              return (
                <div className="da-silva-loop-row">
                  <h3 style={{ paddingTop: "10px" }}>{v}</h3>
                  <div className="da-silva-loop-column">
                    <Image
                      src={require("../../assets/da-silva/" + v + ".svg")}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </Collapse>
    </>
  );
};
