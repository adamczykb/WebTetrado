import { Content } from "antd/es/layout/layout";
import { UseAppContext } from "../../AppContextProvider";

export default function About() {
  const context = UseAppContext();
  let renderContent = () => {
    return (
      <Content
        style={{
          padding: !context.viewSettings.isCompressedViewNeeded
            ? "0 24px"
            : "0 0",
          minHeight: 280,
        }}
      >
        <div className="site-layout-content">
          <h1>About</h1>
        </div>
      </Content>
    );
  };
  return renderContent();
}
