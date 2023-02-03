import { Skeleton } from "antd";
import dayjs from "dayjs";
import { Thread, User } from "models";
import React from "react";

type Props = {
    isLoading?: boolean;
    user?: User;
    thread?: Thread;
    description?: React.ReactNode | string;
};

function ThreadHeader({ isLoading, user, thread, description }: Props) {
    return (
        <div className="w-full flex items-center">
            {isLoading ? <Skeleton.Avatar active /> : <img src={user?.avatar} className="w-10 h-10 rounded-full object-cover" alt={user?.name} />}
            {isLoading ? (
                <Skeleton paragraph={{ rows: 1 }} active className="ml-4" />
            ) : (
                <div className="ml-4 flex flex-col gap-3">
                    <p className="font-semibold m-0">
                        {user?.name}
                        {thread ? <span className="font-normal text-gray-400"> . {dayjs(thread?.createdAt).format("DD MMM")}</span> : ""}
                    </p>
                    <p className="font-medium m-0">{description}</p>
                </div>
            )}
        </div>
    );
}

export default ThreadHeader;
