import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorBgLayout: '#f4f5f6',
          colorPrimary: '#04afa4'
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
