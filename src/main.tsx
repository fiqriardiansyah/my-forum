import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { Provider as ReduxProvider } from "react-redux";
import "./style/index.css";
import "antd/dist/reset.css";

import { ThemeConfig } from "antd/es/config-provider/context";
import store from "states";
import App from "./App";

const theme: ThemeConfig = {
    token: {
        colorPrimary: "#1DA1F2",
    },
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ConfigProvider theme={theme}>
        <React.StrictMode>
            <ReduxProvider store={store}>
                <App />
            </ReduxProvider>
        </React.StrictMode>
    </ConfigProvider>
);
