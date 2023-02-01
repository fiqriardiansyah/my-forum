import Sidebar from "components/sidebar";
import { Outlet } from "react-router-dom";
import RightSidebar from "./right-sidebar";

function Layout() {
    return (
        <div className="w-full flex container mx-auto px-4">
            <Sidebar />
            <div className="flex-1 relative">
                <Outlet />
            </div>
            <RightSidebar />
        </div>
    );
}

export default Layout;
