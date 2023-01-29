import Auth from "pages/auth/auth";
import SignIn from "pages/auth/sign-in";
import SignUp from "pages/auth/sign-up";
import LoadingBar from "react-redux-loading-bar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AUTH, SIGN_IN, SIGN_UP } from "utils/routes";

function App() {
    const login = false;

    return (
        <>
            <LoadingBar style={{ background: "#1DA1F2", boxShadow: "2px 2px 2px rgba(0,0,0,0.2)" }} />
            <BrowserRouter>
                {!login ? (
                    <Routes>
                        <Route path={AUTH} element={<Auth />}>
                            <Route path={SIGN_IN} element={<SignIn />} />
                            <Route path={SIGN_UP} element={<SignUp />} />
                        </Route>
                        <Route path="*" element={<Navigate to={SIGN_IN} />} />
                    </Routes>
                ) : (
                    <Routes>
                        <Route path="/" element={<h1>hello user</h1>} />
                    </Routes>
                )}
            </BrowserRouter>
        </>
    );
}

export default App;
