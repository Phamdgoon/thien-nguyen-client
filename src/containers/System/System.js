import React from "react";
import Sidebar from "./Sidebar";
import menuSidebarAdmin from "../../utils/menuSidebarAdmin";
import { Outlet } from "react-router-dom";

const System = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="flex w-full h-screen flex-auto">
                <Sidebar title="Admin" menu={menuSidebarAdmin} />
                <div className="flex-auto bg-white shadow-md h-full overflow-y-scroll">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default System;
