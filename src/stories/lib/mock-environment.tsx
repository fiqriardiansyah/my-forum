import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const MockEnvironment = ({ store, children }: { store: ToolkitStore<any>; children: any }) => (
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="*" element={children} />
            </Routes>
        </BrowserRouter>
    </Provider>
);

export default MockEnvironment;
