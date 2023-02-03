import { Button, Modal } from "antd";
import LoadingBar from "react-redux-loading-bar";
import { Thread } from "models";
import { useState, ReactNode } from "react";
import htmlParser from "html-react-parser";
import { useSelector } from "react-redux";
import { ReducerType } from "states";
import { SelectorUser } from "states/users/reducer";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { SEARCH } from "utils/routes";
import Input from "components/form/input";
import { MODAL_COMMENT } from "states/comments/action";

type ChildrenData = {
    open: boolean;
    closeHandler: () => void;
    openHandler: () => void;
};

type Props = {
    children: (dt: ChildrenData) => ReactNode;
    thread?: Thread;
    onSubmitHandler: (comments: string, callback: () => void) => void;
};

function CommentModal({ children, thread, onSubmitHandler }: Props) {
    const user = useSelector<ReducerType, SelectorUser>((state) => state.user);
    const [open, setOpen] = useState(false);

    const ownerThread = user?.users?.find((usr) => usr.id === thread?.ownerId);

    const closeHandler = () => {
        setOpen(false);
    };

    const openHandler = () => {
        setOpen(true);
    };

    const childrenData: ChildrenData = {
        open,
        openHandler,
        closeHandler,
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        const comments = e.target.querySelector("#comments").innerHTML;
        if (!comments) return;
        onSubmitHandler(comments, () => {
            closeHandler();
            e.target.querySelector("#comments").innerHTML = "";
        });
    };

    return (
        <>
            <Modal title={<p></p>} open={open} onCancel={closeHandler} footer={null} className="modal-comment">
                <LoadingBar style={{ background: "#1DA1F2" }} scope={MODAL_COMMENT} />
                <form onSubmit={onSubmit} className="p-6">
                    <div className="w-full flex gap-4 mt-5 overflow-hidden">
                        <div className="flex flex-col items-center h-full">
                            <img src={ownerThread?.avatar} className="w-12 h-12 rounded-full object-cover" alt="" />
                            <div className="h-full bg-gray-300 min-h-[70px] mt-2" style={{ width: "2px" }}></div>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <p className="font-semibold m-0">
                                {ownerThread?.name} . <span className="font-normal text-gray-400">{dayjs(thread?.createdAt).format("DD MMM")}</span>
                            </p>
                            <p className="font-medium m-0">
                                {thread?.title}{" "}
                                <Link to={SEARCH + "?tag=" + thread?.category} className="no-underline hover:underline w-fit">
                                    <span className="mt-1 text-primary font-medium">#{thread?.category}</span>
                                </Link>
                            </p>
                            <div className="font-normal text-gray-600 line-clamp-3">
                                {htmlParser(thread?.body || "")} <br />
                            </div>
                            <p className="m-0 text-gray-400">
                                Membalas <span className="text-primary font-semibold">@{ownerThread?.name}</span>
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex gap-4 mt-3">
                        <img src={user?.avatar} className="w-12 h-12 rounded-full object-cover" alt="" />
                        <Input id="comments" placeholder="Speak your reply" />
                    </div>
                    <div className="w-full flex items-center justify-end mt-4">
                        <Button type="primary" htmlType="submit" className="!font-semibold !rounded-full" size="large">
                            Reply
                        </Button>
                    </div>
                </form>
            </Modal>
            {children(childrenData)}
        </>
    );
}

export default CommentModal;
