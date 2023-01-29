import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as ReduxProvider } from "react-redux";
import { ReactQueryDevtools } from "react-query/devtools";
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

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ConfigProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
            <React.StrictMode>
                <ReduxProvider store={store}>
                    <App />
                </ReduxProvider>
            </React.StrictMode>
            <ReactQueryDevtools />
        </QueryClientProvider>
    </ConfigProvider>
);
