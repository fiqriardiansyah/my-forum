import Tabs, { Props as TabsProps } from "components/tabs";
import ProfileHeader from "modules/profile/header";
import ProfileInfo from "modules/profile/info";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { ReducerType } from "states";
import { asyncGetThreads } from "states/threads/action";
import { asyncGetUsers } from "states/users/action";
import { USER_ID } from "utils/constant";
import { LIKES, USER } from "utils/routes";

function User() {
    const { [USER_ID]: id } = useParams();
    const navigate = useNavigate();
    const state = useSelector<ReducerType, ReducerType>((state) => state);
    const dispatch = useDispatch();

    const itemsTab: TabsProps["items"] = [
        {
            key: USER + "/" + id,
            title: "Threads",
        },
        {
            key: USER + "/" + id + LIKES,
            title: "Likes",
        },
    ];

    const backHandler = () => {
        navigate(-1);
    };

    const onTabChange = (key: string) => {
        navigate(key);
    };

    useEffect(() => {
        dispatch(asyncGetThreads() as any);
        dispatch(asyncGetUsers() as any);
    }, []);

    const user = state?.user?.users?.find((usr) => usr.id === id);

    return (
        <>
            <ProfileHeader user={user} backHandler={backHandler} totalThreads={state?.threads?.threads?.filter((th) => th.ownerId === id)?.length} />
            <ProfileInfo user={user} />
            <Tabs active={location.pathname} onChangeActive={onTabChange} items={itemsTab} className="mt-4 border-bottom" />
            <Outlet />
        </>
    );
}

export default User;
