import clsx from "clsx";
import { IconType } from "react-icons/lib";
import { ButtonHTMLAttributes } from "react";
import { InteractionType } from "models";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    total?: number;
    Icon: IconType;
    variant: InteractionType;
    variantActive?: InteractionType;
};

function ActionButton({ total = 0, Icon, variant, variantActive, className, ...rest }: Props) {
    const iconClass = clsx("p-2 mr-1 !w-9 !h-9 duration-200 rounded-full ", {
        "group-hover:bg-pink-100 group-hover:text-pink-400": variant === "like",
        "group-hover:bg-zinc-100 group-hover:text-zinc-400": variant === "dislike",
        "group-hover:bg-blue-100 group-hover:text-blue-400": variant === "comment",
        "text-pink-400": variantActive === "like",
        "text-zinc-400": variantActive === "dislike",
    });

    const textClass = clsx("mt-1 duration-200 total", {
        "group-hover:text-pink-400": variant === "like",
        "group-hover:text-zinc-400": variant === "dislike",
        "group-hover:text-blue-400": variant === "comment",
    });

    return (
        <button
            title={variant}
            {...rest}
            className={`cursor-pointer duration-200 group bg-transparent border-none !p-0 text-gray-400 flex items-center ${className}`}
        >
            <Icon className={iconClass} />
            <span className={textClass}>{total}</span>
        </button>
    );
}

export default ActionButton;
