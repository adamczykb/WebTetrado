import bottom_arrow from "../../../assets/images/divider_arrow.png";

export const Divider = () => {
  return (
    <>
      <div className={"horizontal-center"} style={{ marginTop: "40px" }}>
        <img alt={"separator"} src={bottom_arrow} style={{ width: "50px" }} />
      </div>
      <div className={"horizontal-center"}>
        <img alt={"separator"} src={bottom_arrow} style={{ width: "50px" }} />
      </div>
    </>
  );
};
