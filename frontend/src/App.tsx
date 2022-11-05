import { DesktopLayout } from "./components/layout/desktop/Layout";
import { MobileLayout } from "./components/layout/mobile/Layout";
import "./assets/css/App.css";
import { AppContextProvider } from "./AppContextProvider";
import { useMediaQuery } from "react-responsive";
export default function App() {
  const isDesktop = useMediaQuery({ query: "(min-width: 1500px)" });
  return (
    <AppContextProvider>
      {isDesktop ? <DesktopLayout /> : <MobileLayout />}
    </AppContextProvider>
  );
}
