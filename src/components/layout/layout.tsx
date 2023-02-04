import Sidebar from "components/layout/sidebar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { cleanDetailThread } from "states/threads/action";
import RightSidebar from "./right-sidebar";

function Layout() {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(cleanDetailThread() as any);
    }, [location.pathname]);

    return (
        <div className="w-full flex container mx-auto px-4">
            <Sidebar />
            <div className="flex-1 relative w-full h-screen overflow-y-auto overflow-x-hidden">
                <Outlet />
            </div>
            <RightSidebar />
        </div>
    );
}

export default Layout;
