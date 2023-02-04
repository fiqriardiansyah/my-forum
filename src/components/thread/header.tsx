import { Skeleton } from "antd";
import dayjs from "dayjs";
import relative from "dayjs/plugin/relativeTime";
import { User } from "models";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReducerType } from "states";
import { SelectorUser } from "states/users/reducer";
import { PROFILE, USER } from "utils/routes";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    isLoading?: boolean;
    user?: User;
    time?: string;
    description?: React.ReactNode | string;
};

dayjs.extend(relative);

function ThreadHeader({ isLoading, user, time, description, className, ...rest }: Props) {
    const myProfile = useSelector<ReducerType, SelectorUser>((state) => state.user);
    const navigate = useNavigate();

    const onClickUser = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        if (myProfile?.id === user?.id) {
            navigate(PROFILE);
            return;
        }
        navigate(USER + "/" + user?.id);
    };

    return (
        <div className={`w-full flex items-start ${className}`} {...rest}>
            {isLoading ? (
                <Skeleton.Avatar active />
            ) : (
                <img
                    src={user?.avatar}
                    onClick={onClickUser}
                    className="w-12 h-12 rounded-full object-cover hover:opacity-75 bg-gray-500 cursor-pointer"
                    alt={user?.name}
                />
            )}
            {isLoading ? (
                <Skeleton paragraph={{ rows: 1 }} active className="ml-4" />
            ) : (
                <div className="ml-4 flex flex-col gap-1">
                    <p className="font-semibold m-0">
                        <span onClick={onClickUser} className="hover:underline cursor-pointer">
                            {user?.name}
                        </span>
                        {time ? <span className="font-normal text-gray-400"> . {dayjs(time).fromNow()}</span> : ""}
                    </p>
                    <div className="font-medium m-0">{description}</div>
                </div>
            )}
        </div>
    );
}

export default ThreadHeader;
