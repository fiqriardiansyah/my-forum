import React, { useEffect, useRef, HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
    id: string;
    placeholder: string;
    defaultValue?: string;
};

function Input({ id = "", placeholder = "", defaultValue = "", className, ...rest }: Props) {
    const thisRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (defaultValue && thisRef.current) {
            thisRef.current.innerHTML = defaultValue;
        }
    }, [defaultValue]);

    return (
        <div
            {...rest}
            ref={thisRef}
            id={id}
            contentEditable
            placeholder={placeholder}
            className={`w-full overflow-auto cursor-texts text-xl rounded-lg text-text-primary dark:text-text-primary-dark bg-secondary dark:bg-secondary-dark  border-none focus:outline-none ${className}`}
        />
    );
}

export default Input;
