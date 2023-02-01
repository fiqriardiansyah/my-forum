import { Affix } from "antd";

type Props = {
    title?: string;
};

function Header({ title }: Props) {
    return (
        <div className="w-full p-3 font-semibold text-2xl bg-white sticky top-0 z-10" style={{ borderBottom: "1px solid rgb(229 231 235)" }}>
            {title}
        </div>
    );
}

export default Header;
