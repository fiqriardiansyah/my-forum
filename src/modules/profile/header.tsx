import ButtonBack from "components/button/back";
import Header from "components/layout/header";
import { User } from "models";

type Props = {
    user?: User;
    totalThreads?: number;
    backHandler: () => void;
};

function ProfileHeader({ user, totalThreads = 0, backHandler }: Props) {
    return (
        <Header>
            <div className="w-full flex items-center gap-9">
                <ButtonBack title="Back" onClick={backHandler} />
                <div className="flex flex-col">
                    <p className="font-semibold m-0 leading-5">{user?.name}</p>
                    <span className="text-xs font-light text-gray-400 m-0 tracking-wider">{totalThreads} Threads</span>
                </div>
            </div>
        </Header>
    );
}

export default ProfileHeader;
