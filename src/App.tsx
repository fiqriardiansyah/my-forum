import Auth from "pages/auth/auth";
import SignIn from "pages/auth/sign-in";
import SignUp from "pages/auth/sign-up";
import Layout from "components/layout/layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReducerType } from "states";
import { asyncGetProfile } from "states/users/action";
import { AUTH, EXPLORE, LEADERBOARDS, LIKES, PROFILE, PROFILE_LIKES, SIGN_IN, SIGN_UP, THREAD, USER } from "utils/routes";
import Home from "pages/home";
import LeaderBoards from "pages/leaderboards";
import { SelectorUser } from "states/users/reducer";
import Profile from "pages/profile";
import MyThreads from "pages/my-threads";
import MyLikes from "pages/my-likes";
import Explore from "pages/explore";
import User from "pages/user";
import { THREAD_ID, USER_ID } from "utils/constant";
import Thread from "pages/thread";
import endPoints from "service/end-points";

function App() {
    const user = useSelector<ReducerType, SelectorUser>((state) => state.user);
    const dispatch = useDispatch();

    const getProfile = async () => (await endPoints.Me()).data?.data?.user;

    useEffect(() => {
        if (user?.token && !user.id) {
            dispatch(asyncGetProfile(getProfile) as any);
        }
    }, [user?.token]);

    return (
        <>
            <LoadingBar style={{ background: "#1DA1F2", boxShadow: "2px 2px 2px rgba(0,0,0,0.2)", zIndex: 20 }} />
            <BrowserRouter>
                {user?.token ? (
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route path="/" element={<Home />} />
                            <Route path={LEADERBOARDS} element={<LeaderBoards />} />
                            <Route path={PROFILE} element={<Profile />}>
                                <Route path={PROFILE} element={<MyThreads />} />
                                <Route path={PROFILE_LIKES} element={<MyLikes />} />
                            </Route>
                            <Route path={EXPLORE} element={<Explore />} />
                            <Route path={THREAD + "/:" + THREAD_ID} element={<Thread />} />
                            <Route path={USER} element={<User />}>
                                <Route path={USER + "/:" + USER_ID} element={<MyThreads />} />
                                <Route path={USER + "/:" + USER_ID + LIKES} element={<MyLikes />} />
                            </Route>
                        </Route>
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                ) : (
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route path="/" element={<Home />} />
                            <Route path={LEADERBOARDS} element={<LeaderBoards />} />
                            <Route path={EXPLORE} element={<Explore />} />
                            <Route path={THREAD + "/:" + THREAD_ID} element={<Thread />} />
                            <Route path={USER} element={<User />}>
                                <Route path={USER + "/:" + USER_ID} element={<MyThreads />} />
                                <Route path={USER + "/:" + USER_ID + LIKES} element={<MyLikes />} />
                            </Route>
                        </Route>
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
