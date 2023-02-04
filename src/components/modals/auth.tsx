import { Modal } from "antd";
import ButtonAuth from "components/button/auth";
import { InteractionType } from "models";
import { ReactNode, useState } from "react";
import { AiTwotoneDislike, AiTwotoneLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { SIGN_IN, SIGN_UP } from "utils/routes";

export type AuthModalChildren = {
    open: boolean;
    closeHandler: () => void;
    openHandler: () => void;
    openWithContentHandler: (content: InteractionType) => void;
};

type Props = {
    children: (dt: AuthModalChildren) => ReactNode;
};

function AuthModal({ children }: Props) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState<InteractionType | null>(null);

    const closeHandler = () => {
        setOpen(false);
    };

    const openHandler = () => {
        setOpen(true);
    };

    const openWithContentHandler = (cntn: InteractionType) => {
        setContent(cntn);
        openHandler();
    };

    const childrenData: AuthModalChildren = {
        open,
        openHandler,
        closeHandler,
        openWithContentHandler,
    };

    return (
        <>
            <Modal title={<p></p>} open={open} onCancel={closeHandler} footer={null} className="modal-comment">
                <div className="p-10 flex flex-col gap-4">
                    {content === "like" && (
                        <div className="flex flex-col items-center px-10">
                            <AiTwotoneLike className="text-6xl text-pink-400" />
                            <p className="m-0 font-bold text-2xl mt-10">Sukai sebuah Cuitan untuk menyebarkan cinta.</p>
                            <p className="m-0 text-gray-400">Bergabung ke My Forum sekarang agar FaktaBola tahu bahwa Anda menyukai Cuitan-nya.</p>
                        </div>
                    )}
                    {content === "dislike" && (
                        <div className="flex flex-col items-center px-10">
                            <AiTwotoneDislike className="text-6xl text-zinc-400" />
                            <p className="m-0 font-bold text-2xl mt-10">Tidak Sukai sebuah Cuitan.</p>
                            <p className="m-0 text-gray-400">Setelah Anda bergabung dengan My Forum, Anda dapat menanggapi Diskusi.</p>
                        </div>
                    )}
                    {content === "comment" && (
                        <div className="flex flex-col items-center px-10">
                            <FaComment className="text-6xl text-blue-400" />
                            <p className="m-0 font-bold text-2xl mt-10">Balas untuk bergabung dengan percakapan.</p>
                            <p className="m-0 text-gray-400">Setelah Anda bergabung dengan My Forum, Anda dapat menanggapi Diskusi.</p>
                        </div>
                    )}
                    <ButtonAuth to={SIGN_IN}>Masuk</ButtonAuth>
                    <ButtonAuth to={SIGN_UP}>Buat akun</ButtonAuth>
                </div>
            </Modal>
            {children(childrenData)}
        </>
    );
}

export default AuthModal;
