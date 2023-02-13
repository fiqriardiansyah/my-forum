import { HTMLAttributes } from "react";
import clsx from "clsx";

export type Props = HTMLAttributes<HTMLDivElement> & {
    active?: string;
    onChangeActive?: (active: string) => void;
    items?: {
        key: string;
        title: React.ReactNode;
    }[];
};

function Tabs({ active = "", items, onChangeActive, ...rest }: Props) {
    const buttonClassname = (key: string) => {
        return clsx("!flex-1 p-4 bg-white hover:bg-gray-200 duration-300 border-none cursor-pointer text-gray-700 relative", {
            "font-semibold": active === key,
            active: active === key,
        });
    };

    const onItemClickHandler = (key: string) => {
        return () => {
            if (onChangeActive) {
                onChangeActive(key);
            }
        };
    };

    return (
        <div {...rest}>
            <div className="w-full flex items-center">
                {items?.map((item) => (
                    <button onClick={onItemClickHandler(item.key)} className={buttonClassname(item.key)} key={item.key}>
                        {item.title}
                        {item.key === active && (
                            <div className="w-[60%] h-1 bg-primary rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Tabs;
