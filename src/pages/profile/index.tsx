import Tabs, { Props as TabsProps } from "components/tabs";
import ProfileHeader from "modules/profile/header";
import ProfileInfo from "modules/profile/info";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import endPoints from "service/end-points";
import { ReducerType } from "states";
import { asyncGetThreads } from "states/threads/action";
import { asyncGetUsers } from "states/users/action";
import { PROFILE, PROFILE_LIKES } from "utils/routes";

function Profile() {
    const navigate = useNavigate();
    const state = useSelector<ReducerType, ReducerType>((state) => state);
    const dispatch = useDispatch();

    const itemsTab: TabsProps["items"] = [
        {
            key: PROFILE,
            title: "Threads",
        },
        {
            key: PROFILE_LIKES,
            title: "Likes",
        },
    ];

    const backHandler = () => {
        navigate("/");
    };

    const onTabChange = (key: string) => {
        navigate(key);
    };

    const getThreads = async () => (await endPoints.Threads()).data.data.threads;
    const getUsers = async () => (await endPoints.Users()).data.data.users;

    useEffect(() => {
        dispatch(asyncGetThreads(getThreads) as any);
        dispatch(asyncGetUsers(getUsers) as any);
    }, []);

    return (
        <>
            <ProfileHeader
                user={state?.user}
                backHandler={backHandler}
                totalThreads={state?.threads?.threads?.filter((th) => th.ownerId === state?.user?.id)?.length}
            />
            <ProfileInfo user={state?.user} />
            <Tabs active={location.pathname} onChangeActive={onTabChange} items={itemsTab} className="mt-4 border-bottom" />
            <Outlet />
        </>
    );
}

export default Profile;
