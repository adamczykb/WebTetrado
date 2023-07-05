import { useEffect, useState } from "react";
import { Anchor, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import AnchorRouter from "../../../routes/anchorRouter";

import logo from "../../../assets/images/logo_simple.png";
import pp_img from "../../../assets/images/PP-PUT_logo_jasne.png";
import ichb_img from "../../../assets/images/ICHB_PAN_EN_kolor.png";
// import rna_polis_img from "../../../assets/images/RNApolis-logo.png";

export const ContentList = (setMenuExpanded: any) => {
  const [targetOffset, setTargetOffset] = useState<number | undefined>(
    undefined
  );
  useEffect(() => {
    setTargetOffset(window.innerHeight / 4);
  }, []);
  return (
    <>
      <div className="nav-slider">
        <div
          className="vertical-center"
          style={{ justifyContent: "space-between", flexDirection: 'unset' }}
        >
          <a href="/">
            <img alt="logo" height={"64px"} src={logo} />
          </a>
          <Button
            type="text"
            id={"navigation-button"}
            onClick={() => {
              setMenuExpanded(true);
            }}
          >
            <MenuOutlined rev={undefined} id="MenuOutlined-desktop" />
          </Button>
        </div>

        <Anchor
          style={{
            margin: "50px 0",
          }}
          targetOffset={targetOffset}
        >
          <AnchorRouter />
        </Anchor>
        <div style={{ marginLeft: "5px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <a
              target="_blank"
              rel="noreferrer"
              href={"https://www.put.poznan.pl/index.php/en"}
            >
              <img alt={"PP logo"} style={{ width: "80%" }} src={pp_img} />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={"https://www.ibch.poznan.pl/en.html"}
            >
              <img
                alt={"IBCH logo"}
                style={{ width: "80%", float: "right" }}
                src={ichb_img}
              />
            </a>
          </div>
          {/* <div style={{ marginTop: "30px" }}> */}
          {/*   <a */}
          {/*     target="_blank" */}
          {/*     rel="noreferrer" */}
          {/*     href={"https://www.rnapolis.pl/"} */}
          {/*   > */}
          {/*     <img */}
          {/*       alt={"RNApolis"} */}
          {/*       style={{ width: "100%" }} */}
          {/*       src={rna_polis_img} */}
          {/*     /> */}
          {/*   </a> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};
