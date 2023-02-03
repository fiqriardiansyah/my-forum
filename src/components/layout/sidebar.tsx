import { RiHome7Fill, RiHome7Line } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import LogoPrimary from "assets/svgs/logo-primary.svg";
import SideLink from "components/button/side-link";
import { MdOutlineLeaderboard, MdLeaderboard } from "react-icons/md";
import { HiUser, HiOutlineUser, HiOutlineHashtag } from "react-icons/hi";
import { FaHashtag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "states";
import { Popover, Skeleton } from "antd";
import { doLogout } from "states/users/action";
import { EXPLORE, LEADERBOARDS, PROFILE } from "utils/routes";
import { SelectorUser } from "states/users/reducer";

function Sidebar() {
    const user = useSelector<ReducerType, SelectorUser>((state) => state.user);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(doLogout());
    };

    const content = (
        <div className="py-2">
            <button onClick={logoutHandler} className="m-0 font-semibold text-lg bg-transparent border-none cursor-pointer">
                Log out {user?.email}
            </button>
        </div>
    );
    return (
        <div className="w-[300px] min-h-screen p-4 flex flex-col items-start justify-between" style={{ borderRight: "1px solid rgb(229 231 235)" }}>
            <div className="flex flex-col items-start gap-1">
                <img src={LogoPrimary} className="h-10 mb-8 ml-4" alt="myforum" />
                <SideLink
                    text="Home"
                    to="/"
                    activeIcon={<RiHome7Fill className="text-3xl mr-4" />}
                    inActiveIcon={<RiHome7Line className="text-3xl mr-4" />}
                />
                <SideLink
                    text="Explore"
                    to={EXPLORE}
                    activeIcon={<FaHashtag className="text-3xl mr-4" />}
                    inActiveIcon={<HiOutlineHashtag className="text-3xl mr-4" />}
                />
                <SideLink
                    text="Leaderboards"
                    to={LEADERBOARDS}
                    activeIcon={<MdLeaderboard className="text-3xl mr-4" />}
                    inActiveIcon={<MdOutlineLeaderboard className="text-3xl mr-4" />}
                />
                <SideLink
                    text="Profile"
                    to={PROFILE}
                    activeIcon={<HiUser className="text-3xl mr-4" />}
                    inActiveIcon={<HiOutlineUser className="text-3xl mr-4" />}
                />
            </div>
            <Popover content={content} trigger={["click"]}>
                {user?.id ? (
                    <button className="flex items-center bg-transparent w-full p-2 rounded-full border-none cursor-pointer hover:bg-gray-200 duration-300 justify-between">
                        <div className="flex items-center">
                            <img src={user?.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                            <p className="m-0 text-left mx-3">
                                {user?.name} <br /> {user?.email}
                            </p>
                        </div>
                        <BsThreeDots className="mr-2" />
                    </button>
                ) : (
                    <Skeleton avatar paragraph={{ rows: 1 }} active />
                )}
            </Popover>
        </div>
    );
}

export default Sidebar;
