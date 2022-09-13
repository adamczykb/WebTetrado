import { CloseOutlined } from "@ant-design/icons";

export const Menu = (isMenuExpanded: any, setMenuExpanded: any) => {
  return (
    <div
      id="menu"
      style={{
        left: isMenuExpanded ? "0px" : "-100%",
      }}
    >
      <a href="/">
        <div>HOME</div>
      </a>
      <a href="/help">
        <div>HELP</div>
      </a>
      <a href="/citeus">
        <div>CITE US</div>
      </a>
      <a href="/about">
        <div>ABOUT</div>
      </a>
      <div
        onClick={() => {
          setMenuExpanded(false);
        }}
        style={{
          border: "0",
          position: "absolute",
          right: "10px",
          top: "0px",
        }}
      >
        <CloseOutlined />
      </div>
    </div>
  );
};
