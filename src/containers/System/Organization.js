import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import menuSidebarOrganization from "../../utils/menuSidebarOrganization";

const Organization = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="flex w-full h-screen flex-auto">
                <Sidebar title="Tổ chức" menu={menuSidebarOrganization} />
                <div className="flex-auto bg-white shadow-md h-full overflow-y-scroll">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Organization;
