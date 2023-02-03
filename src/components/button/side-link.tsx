import { ReactNode } from "react";
import clsx from "clsx";
import { Link, LinkProps, useLocation } from "react-router-dom";

type Props = LinkProps & {
    activeIcon: ReactNode;
    inActiveIcon: ReactNode;
    text: string;
};

function SideLink({ className, activeIcon, inActiveIcon, text, ...rest }: Props) {
    const location = useLocation();
    const isActive = rest.to?.toString() === "/" ? location.pathname === rest.to?.toString() : location.pathname.includes(rest?.to?.toString());

    const buttonClass = clsx(
        "flex items-center bg-transparent border-none cursor-pointer text-2xl rounded-full w-fit hover:bg-gray-200 p-2 px-4 duration-200",
        {
            "text-black font-semibold": isActive,
            "font-normal text-gray-800": !isActive,
        }
    );
    return (
        <Link {...rest} className={`no-underline ${className}`}>
            <button className={buttonClass}>
                {isActive ? activeIcon : inActiveIcon}
                {text}
            </button>
        </Link>
    );
}

export default SideLink;
