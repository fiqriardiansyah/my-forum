import Background from "assets/images/twitter-banner.png";
import Logo from "assets/svgs/logo.svg";
import LogoPrimary from "assets/svgs/logo-primary.svg";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AUTH, SIGN_IN, SIGN_UP } from "utils/routes";

function Auth() {
    const location = useLocation();
    const isAuthPage = AUTH.includes(location.pathname);
    return (
        <div className="w-screen h-screen grid grid-cols-2">
            <div className="w-full h-full bg-primary flex items-center justify-center relative">
                <img src={Logo} alt="logo" className="w-[300px] object-contain z-10" />
                <img src={Background} alt="banner" className="absolute top-0 left-0 h-full w-full object-cover" />
            </div>
            <div className="w-full h-full bg-white p-5">
                <img src={LogoPrimary} alt="logo" className="w-[40px] object-contain mb-16" />
                <h1 className="m-0 font-semibold text-5xl mb-10">Happening now</h1>
                <div className="flex flex-col gap-4">
                    {isAuthPage && (
                        <>
                            <h2 className="m-0 font-semibold text-3xl">Join My Forum today</h2>
                            <Link to={SIGN_UP}>
                                <button className="w-[500px] bg-primary text-white capitalize rounded-full p-2 text-xl">sign up</button>
                            </Link>
                            <Link to={SIGN_IN}>
                                <button className="w-[500px] bg-white border border-primary text-primary capitalize rounded-full p-2 text-xl">
                                    log in
                                </button>
                            </Link>
                        </>
                    )}
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Auth;
