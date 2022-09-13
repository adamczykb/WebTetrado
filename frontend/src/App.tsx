import { useMediaQuery } from "react-responsive";
import { DesktopLayout } from "./components/layout/desktop/Layout";
import { MobileLayout } from "./components/layout/mobile/Layout";
import "./assets/css/App.css";
export default function App() {
  let isDesktop: Boolean = useMediaQuery({ query: "(min-width: 1620px)" });

  return <>{isDesktop ? <DesktopLayout /> : <MobileLayout />}</>;
}
