import React, { useCallback, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Button } from "../../components";
import icons from "../../utils/icons";
import { path } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

const { CiLogin, BsPersonCircle } = icons;

const notActive = "hover:text-[#F5F5F5] px-4 h-full flex items-center";
const active = "hover:text-[#ED1651] px-4 h-full flex items-center";
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } });
    }, []);
    const hanldeClickDonation = () => {
        navigate(path.PROJECT_CAMPAIGN);
    };
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };
    const handleNavigateProfile = () => {
        navigate(path.PROFILE);
    };
    const handleNavigateDetailRegisterCampain = () => {
        navigate(path.DETAIL_REGISTER_CAMPAIGN);
    };

    return (
        <div className="w-full fixed top-0 left-0 z-50 bg-white ">
            <div className="w-full flex gap-6 items-center justify-center">
                <Link to={"/"}>
                    <img
                        src={logo}
                        alt="logo"
                        className="'w-[240px] h-[70px] object-contain"
                    />
                </Link>
                <div className="h-full flex items-center text-lg font-medium">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? active : notActive
                        }
                        to={"/"}
                    >
                        Trang chủ
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? active : notActive
                        }
                        to={path.PROJECT_CAMPAIGN}
                    >
                        Dự án
                    </NavLink>
                    <Button
                        text="Ủng hộ ngay"
                        bgColor="bg-[#ED1651] hover:bg-opacity-75"
                        textColor="text-white"
                        px="px-6"
                        onclick={hanldeClickDonation}
                    />

                    <div className="ml-6 gap-2 flex items-center">
                        {!isLoggedIn && (
                            <div className="flex items-center gap-3">
                                <CiLogin color="#ED1651" size={26} />
                                <div className="flex items-center">
                                    <Button
                                        text={"Đăng ký"}
                                        textColor="text-gray-500 hover:text-[#ED1651]"
                                        onclick={() => goLogin(true)}
                                    />
                                    <span className="text-gray-500">/</span>
                                    <Button
                                        text={"Đăng nhập"}
                                        textColor="text-gray-500 hover:text-[#ED1651]"
                                        onclick={() => goLogin(false)}
                                    />
                                </div>
                            </div>
                        )}
                        {isLoggedIn && (
                            <div className="flex items-center gap-3 relative">
                                <CiLogin color="#ED1651" size={26} />
                                <div className="flex items-center">
                                    <Button
                                        text={"Đăng xuất"}
                                        textColor="text-gray-500 hover:text-[#ED1651]"
                                        onclick={() =>
                                            dispatch(actions.logout("user"))
                                        }
                                    />
                                    <div className="relative">
                                        <BsPersonCircle
                                            size={26}
                                            color="gray"
                                            onClick={toggleDropdown}
                                            className="cursor-pointer"
                                        />
                                        {showDropdown && (
                                            <div
                                                className="absolute mt-2 w-60 bg-white shadow-md rounded-md border z-50"
                                                style={{
                                                    top: "100%",
                                                }}
                                            >
                                                <ul className="text-sm text-gray-700">
                                                    <li
                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                        onClick={
                                                            handleNavigateProfile
                                                        }
                                                    >
                                                        Thông tin cá nhân
                                                    </li>
                                                    <li
                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                        onClick={
                                                            handleNavigateDetailRegisterCampain
                                                        }
                                                    >
                                                        Dự án đăng ký tình
                                                        nguyện viên
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
