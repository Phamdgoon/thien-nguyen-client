import React from "react";
import logo from "../../assets/logo.png";
import icons from "../../utils/icons";

const { CiMail, CiLocationOn, CiMobile3 } = icons;

const Footer = () => {
    return (
        <div className="w-full h-[300px] bg-[#2a4772]">
            <div className="w-full gap-10 flex items-center justify-center">
                <img
                    src={logo}
                    alt="logo"
                    className="'w-[240px] h-[70px] object-contain"
                />
                <span className="text-white text-[20px] font-bold">
                    Nền tảng gây quỹ cộng đồng trực tuyến tiện lợi, tin cậy và
                    minh bạch.
                </span>
            </div>
            <div className="w-full bg-white border mt-2"></div>
            <div className="mt-4">
                <ul className="w-full flex gap-14 list-disc justify-center">
                    <li className="text-white">Giới thiệu</li>
                    <li className="text-white">Điều khoản và điều kiện</li>
                    <li className="text-white">Tin tức</li>
                    <li className="text-white">Báo chí</li>
                </ul>
            </div>
            <div className="w-full ml-80 flex flex-col gap-4 justify-center mt-4">
                <div className="flex items-center gap-2 justify-start">
                    <span>
                        <CiMobile3 size={24} color="white" />
                    </span>
                    <span className="text-white">Hotline: 0866920451</span>
                </div>
                <div className="flex items-center gap-2 justify-start">
                    <span>
                        <CiMail size={24} color="white" />
                    </span>
                    <span className="text-white">phamdgoon1606@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 justify-start">
                    <span>
                        <CiLocationOn size={24} color="white" />
                    </span>
                    <span className="text-white">
                        Đinh Tiên Hoàng, Thanh Bình, Hải Châu, Đà Nẵng
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Footer;
