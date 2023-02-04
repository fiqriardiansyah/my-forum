import React from "react";
import { Link } from "react-router-dom";

type Props = React.HTMLAttributes<HTMLButtonElement> & {
    to: string;
};

function ButtonAuth({ className, to, ...rest }: Props) {
    return (
        <Link to={to} className="text-black">
            <button
                className={`w-full bg-white border border-gray-800 rounded-full p-3 font-semibold hover:bg-gray-100 cursor-pointer ${className}`}
                {...rest}
                type="button"
            />
        </Link>
    );
}

export default ButtonAuth;
