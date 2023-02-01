import Auth from "pages/auth/auth";
import SignIn from "pages/auth/sign-in";
import SignUp from "pages/auth/sign-up";
import Layout from "components/layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReducerType } from "states";
import { asyncGetProfile } from "states/users/action";
import { AUTH, LEADERBOARDS, SIGN_IN, SIGN_UP } from "utils/routes";
import Home from "pages/home/home";
import LeaderBoards from "pages/leaderboards/leaderboards";
import { SelectorUser } from "states/users/reducer";

function App() {
    const user = useSelector<ReducerType, SelectorUser>((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user?.token && !user.id) {
            dispatch(asyncGetProfile() as any);
        }
    }, [user?.token]);

    return (
        <>
            <LoadingBar style={{ background: "#1DA1F2", boxShadow: "2px 2px 2px rgba(0,0,0,0.2)", zIndex: 100 }} />
            <BrowserRouter>
                {user?.token ? (
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route path="/" element={<Home />} />
                            <Route path={LEADERBOARDS} element={<LeaderBoards />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                ) : (
                    <Routes>
                        <Route path={AUTH} element={<Auth />}>
                            <Route path={SIGN_IN} element={<SignIn />} />
                            <Route path={SIGN_UP} element={<SignUp />} />
                        </Route>
                        <Route path="*" element={<Navigate to={SIGN_IN} />} />
                    </Routes>
                )}
            </BrowserRouter>
        </>
    );
}

export default App;
