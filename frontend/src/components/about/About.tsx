import { Content } from "antd/es/layout/layout";
import { useMediaQuery } from "react-responsive";

export default function About() {
  let isDesktop = useMediaQuery({ query: "(min-width: 900px)" });

  let renderContent = () => {
    return (
      <Content
        style={{ padding: isDesktop ? "0 24px" : "0 0", minHeight: 280 }}
      >
        <div className="site-layout-content">
          <h1>About</h1>
        </div>
      </Content>
    );
  };
  return renderContent();
}
