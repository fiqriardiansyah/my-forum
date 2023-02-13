import { Button, Input } from "antd";
import InputRich from "components/form/input";
import { CreateThread } from "models";
import { useState } from "react";
import { useSelector } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { ReducerType } from "states";
import { CREATE_LOADING } from "states/threads/action";

type Props = {
    onSpeakHandler: (dt: CreateThread) => void;
};

function Speak({ onSpeakHandler }: Props) {
    const state = useSelector<ReducerType, ReducerType>((state) => state);

    const [tag, setTag] = useState("");
    const [title, setTitle] = useState("");

    const onSubmit = (e: any) => {
        e.preventDefault();
        const body = e.target.querySelector("#body").innerHTML;
        if (!title || !tag || !body) return;

        const dt: CreateThread = {
            body,
            category: tag,
            title,
        };
        onSpeakHandler(dt);
        setTag("");
        setTitle("");
        e.target.querySelector("#body").innerHTML = "";
    };

    const onChangeTitleHandler = (e: any) => {
        setTitle(e.target.value);
    };

    const onChangeTagHandler = (e: any) => {
        setTag(e.target.value);
    };

    const choseTagHandler = (tg: string) => {
        return () => {
            setTag(tg);
        };
    };

    const tags = [...new Set(state?.threads?.threads?.map((th) => th?.category) || [])];

    return (
        <div className="border-bottom">
            <LoadingBar style={{ background: "#1DA1F2", zIndex: "20" }} scope={CREATE_LOADING} />
            <form onSubmit={onSubmit} className="p-3">
                <div className="w-full flex gap-4">
                    <img src={state?.user?.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                    <div className="w-full flex flex-col gap-1 overflow-hidden">
                        <Input value={title} onChange={onChangeTitleHandler} bordered={false} placeholder="Title" className="!p-0" />
                        <InputRich id="body" placeholder="What's happening?" className="w-full overflow-hidden break-words" />
                        <Input value={tag} onChange={onChangeTagHandler} bordered={false} placeholder="Hastag" className="!p-0 text-primary" />
                        <div className="w-full flex items-center justify-between mt-1 gap-8 m">
                            <div className="w-full flex flex-wrap gap-x-3">
                                {tags?.map((tag) => (
                                    <button
                                        type="button"
                                        onClick={choseTagHandler(tag)}
                                        key={tag}
                                        className="mt-1 text-primary font-medium bg-transparent border-none cursor-pointer"
                                    >
                                        #{tag}
                                    </button>
                                ))}
                            </div>
                            <Button title="speak" type="primary" htmlType="submit" className="!font-semibold !rounded-full" size="large">
                                Speak
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Speak;
