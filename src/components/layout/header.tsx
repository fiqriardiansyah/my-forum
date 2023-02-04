type Props = {
    title?: string;
    children?: React.ReactNode;
};

function Header({ title, children }: Props) {
    return (
        <div className="w-full p-3 font-semibold text-2xl sticky top-0 z-10 backdrop-blur-lg border-bottom">
            {children || title}
            <div className="absolute bg-white top-0 left-0 w-full h-full opacity-75" style={{ zIndex: -1 }}></div>
        </div>
    );
}

export default Header;
