import { CloseOutlined } from "@ant-design/icons";
interface MenuArguments {
  isMenuExpanded: any;
  setMenuExpanded: any;
}
export const Menu = (props: MenuArguments) => {
  return (
    <div
      id="menu"
      data-testid="menu"
      style={{
        left: props.isMenuExpanded ? "0" : "-100%",
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
        data-testid="menu-button"
        onClick={() => {
          props.setMenuExpanded(false);
        }}
        style={{
          border: "0",
          position: "absolute",
          right: "10px",
          top: "0px",
        }}
      >
        <CloseOutlined rev={undefined} />
      </div>
    </div>
  );
};
