import { Thread as ThreadType } from "models";
import htmlParser from "html-react-parser";
import { useSelector } from "react-redux";
import { ReducerType } from "states";
import { Skeleton } from "antd";
import dayjs from "dayjs";
import ThreadAction from "./action";

export type Props = {
    thread: ThreadType;
};

function Loading() {
    return (
        <div className="w-full p-3" style={{ borderBottom: "1px solid rgb(229 231 235)" }}>
            <Skeleton avatar paragraph={{ rows: 3 }} />
        </div>
    );
}

const Thread = ({ thread }: Props) => {
    const state = useSelector<ReducerType, ReducerType>((state) => state);
    const user = state.user?.users?.find((usr) => usr.id === thread.ownerId);

    const isLoading = (state.loadingBar as any)?.default !== 0 && !user;

    return (
        <div className="w-full p-3 cursor-pointer hover:bg-gray-50 duration-200" style={{ borderBottom: "1px solid rgb(229 231 235)" }}>
            <div className="w-full flex items-start gap-4">
                {isLoading ? <Skeleton.Avatar active /> : <img src={user?.avatar} className="w-9 h-9 rounded-full object-cover" alt="" />}
                <div className="flex flex-col gap-2 w-full">
                    {isLoading ? (
                        <Skeleton active paragraph={{ rows: 0 }} />
                    ) : (
                        <p className="font-semibold m-0">
                            {user?.name} . <span className="font-normal text-gray-400">{dayjs(thread.createdAt).format("DD MMM")}</span>
                        </p>
                    )}
                    <p className="font-medium m-0">{thread?.title}</p>
                    <div className="font-light text-gray-600">{htmlParser(thread?.body || "")}</div>
                    <ThreadAction thread={thread} />
                </div>
            </div>
        </div>
    );
};

Thread.Loading = Loading;

export default Thread;
