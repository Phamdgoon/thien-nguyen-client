import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions";
import icons from "../../utils/icons";
const activeStyle =
    "hover:bg-gray-300 text-[#ED1651] flex items-center rounded-md px-4 gap-2 py-2 font-bold bg-gray-200 ";
const notActiveStyle =
    "hover:bg-gray-200 rounded-md flex items-center gap-2 px-4 py-2 cursor-pointer";

const { AiOutlineLogout } = icons;

const Sidebar = ({ title, menu }) => {
    const dispatch = useDispatch();
    return (
        <div className="w-64 bg-[#ED1651] text-white p-6">
            <h2 className="text-2xl font-bold mb-8">{title}</h2>
            <div className="flex flex-col gap-2">
                {menu?.map((item) => {
                    return (
                        <NavLink
                            key={item.id}
                            to={item?.path}
                            className={({ isActive }) =>
                                isActive ? activeStyle : notActiveStyle
                            }
                        >
                            {item?.icon} {item.text}
                        </NavLink>
                    );
                })}
                <span
                    onClick={() => dispatch(actions.logout())}
                    className={notActiveStyle}
                >
                    <AiOutlineLogout />
                    Thoát
                </span>
            </div>
        </div>
    );
};

export default Sidebar;
