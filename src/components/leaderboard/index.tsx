import { LeaderBoard } from "models";
import { Skeleton } from "antd";

export type Props = {
    leaderboard: LeaderBoard;
};

function Loading() {
    return (
        <div className="w-full p-3" style={{ borderBottom: "1px solid rgb(229 231 235)" }}>
            <Skeleton avatar paragraph={{ rows: 2 }} />
        </div>
    );
}

const Leaderboard = ({ leaderboard }: Props) => (
    <div className="w-full p-3 hover:bg-gray-50 duration-200" style={{ borderBottom: "1px solid rgb(229 231 235)" }}>
        <div className="w-full flex items-start gap-4">
            <img src={leaderboard?.user?.avatar} className="w-9 h-9 rounded-full object-cover" alt="" />
            <div className="flex flex-col gap-2 w-full">
                <p className="font-semibold m-0">{leaderboard?.user?.name}</p>
                <p className="font-medium m-0">{leaderboard?.score} Points</p>
            </div>
        </div>
    </div>
);

Leaderboard.Loading = Loading;

export default Leaderboard;
