import React from "react";
import { BiArrowBack } from "react-icons/bi";

type Props = React.HTMLAttributes<HTMLButtonElement>;

function ButtonBack({ className, ...rest }: Props) {
    return (
        <button
            {...rest}
            className={`bg-transparent border-none flex items-center justify-center hover:bg-gray-200 p-2 rounded-full cursor-pointer duration-150 ${className}`}
        >
            <BiArrowBack />
        </button>
    );
}

export default ButtonBack;
