import { User } from "models";
import { useLocation } from "react-router-dom";
import { PROFILE } from "utils/routes";

type Props = {
    user?: User;
};

function ProfileInfo({ user }: Props) {
    const location = useLocation();

    return (
        <div className="w-full">
            <div className="h-[300px] bg-gray-200 w-full flex items-end relative">
                <img src={user?.avatar} className="w-[150px] h-[150px] rounded-full absolute bottom-5 left-5 bg-white p-1" alt={user?.name} />
                <div className="h-[100px] w-full bg-white"></div>
            </div>
            <div className="px-5">
                <h1 className="m-0 font-semibold text-3xl">{user?.name}</h1>
                {location.pathname.includes(PROFILE) && <span className="m-0 text-gray-400">{user?.email}</span>}
            </div>
        </div>
    );
}

export default ProfileInfo;
