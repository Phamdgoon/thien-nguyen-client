import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../store/actions";
import Header from "./Header";
import Footer from "./Footer";
import Campaign from "../../components/Campaign";
import { useNavigate } from "react-router-dom";
import { path } from "../../utils/constant";
import { formatTitleForUrl } from "../../utils/Common/formatTitleForUrl ";
import icons from "../../utils/icons";
import { Button, InputFormV2, Modal } from "../../components";
import moment from "moment";
import { SliderImage } from "../System";

const { CiMobile3, CiLocationOn, CiMail } = icons;

const CampaignDetail = () => {
    const dispatch = useDispatch();
    const { campaignId } = useParams();
    const navigate = useNavigate();
    const campaign = useSelector((state) => state.campaign.campaign);
    const campaigns = useSelector((state) => state.campaign.campaigns);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("content");

    const [amount, setAmount] = useState("");
    const [invalidFields, setInvalidFields] = useState([]);

    useEffect(() => {
        if (campaignId) {
            dispatch(actions.getCampaignById(campaignId));
        }
    }, [dispatch, campaignId]);
    useEffect(() => {
        dispatch(actions.getCampaigns());
    }, [dispatch]);

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const otherCampaigns = shuffleArray(campaigns)
        .filter((item) => item.id !== Number(campaignId))
        .slice(0, 3);

    const handleCampaignDetailClick = (title, campaignId) => {
        const formattedTitle = formatTitleForUrl(title);
        navigate(
            `/${path.DETAIL_CAMPAIGN_TITLE_CAMPAIGNID.replace(
                ":title",
                formattedTitle
            ).replace(":campaignId", campaignId)}`
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const currentAmount = parseFloat(campaign?.currentAmount) || 0;
    const targetAmount = parseFloat(campaign?.targetAmount) || 0;
    const progressPercentage =
        targetAmount > 0 ? (currentAmount / targetAmount) * 100 : 0;

    const handleDonateClick = async () => {
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            setInvalidFields([
                { name: "amount", message: "Số tiền không hợp lệ" },
            ]);
            return;
        }
        const payUrl = await dispatch(
            actions.Payment(campaignId, parseFloat(amount))
        );
        if (payUrl) {
            window.location.href = payUrl;
        } else {
            alert("Có lỗi xảy ra khi xử lý thanh toán. Vui lòng thử lại.");
        }
    };
    const formatCurrency = (amount) => {
        if (!amount) return "0đ";
        return parseFloat(amount).toLocaleString("vi-VN") + "đ";
    };

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <Header />
            <div className="w-full relative py-10">
                <img
                    src="https://givenow.vn/wp-content/uploads/2022/03/banner-3.jpg"
                    className="w-full object-cover opacity-50"
                />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#ED1651] font-bold text-5xl">
                    Dự án
                </span>
            </div>
            <div className="w-4/5 flex relative justify-center gap-10">
                <div className="w-1/2">
                    <SliderImage images={campaign?.images} />
                    <div className="flex items-center justify-center px-4 py-2 bg-[#ed1651] rounded-md absolute top-2 left-4">
                        <span className="text-white">
                            {campaign?.category?.value}
                        </span>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col gap-4">
                    <span className="font-semibold text-xl">
                        {campaign?.title}
                    </span>
                    <div className="w-full flex flex-col bg-[#f0f8ff] p-4 h-[250px] rounded-md gap-2 relative">
                        <div className="w-full flex items-center gap-4">
                            <img
                                src={campaign?.organization?.image}
                                className="w-[60px] h-[60px] object-cover rounded-full "
                            />
                            <span className="text-[#ed1651] font-medium">
                                {campaign?.organization?.name}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className=" text-gray-700">
                                Mục tiêu dự án
                            </span>
                            <span className="font-medium">
                                {campaign?.targetAmount}
                            </span>
                        </div>
                        <div className="absolute w-full pr-8 mt-20 rounded-md ">
                            <div className="progress h-3 bg-gray-200 rounded-full mt-8">
                                <div
                                    className="progress-bar bg-[#ed1651] h-full rounded-full"
                                    role="progressbar"
                                    style={{
                                        width: `${progressPercentage}%`,
                                    }}
                                    aria-valuenow={currentAmount}
                                    aria-valuemin="0"
                                    aria-valuemax={targetAmount}
                                ></div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-12">
                            <span className=" text-gray-700">Đã đạt được</span>
                            <span className="font-bold text-[#ed1651] text-xl">
                                {campaign?.currentAmount}
                            </span>
                        </div>
                    </div>
                    {campaign.statusId === 3 ? (
                        <div className="w-full flex items-center justify-center bg-[#fef2f5] h-[70px] rounded-md">
                            <span className="text-[#686c8b] text-lg font-bold">
                                Kết thúc thời gian gây quỹ
                            </span>
                        </div>
                    ) : (
                        <div className="w-full flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span>VNĐ</span>
                                <InputFormV2
                                    value={amount}
                                    setValue={setAmount}
                                    keyPayload="amount"
                                    invalidFields={invalidFields}
                                    setinvalidFields={setInvalidFields}
                                />
                            </div>
                            <Button
                                text={"Ủng hộ ngay"}
                                textColor="text-white"
                                bgColor="bg-[#ED1651]"
                                px="px-6"
                                onclick={handleDonateClick}
                            />
                            <Button
                                text={"Đăng ký tình nguyện viên"}
                                textColor="text-white"
                                bgColor="bg-[#ED1651]"
                                px="px-6"
                                onclick={() => setIsModalOpen(true)}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="w-4/5 flex flex-col mt-10">
                <div className="flex gap-4 mb-4">
                    <Button
                        text="Nội dung"
                        textColor={
                            activeTab === "content"
                                ? "text-white"
                                : "text-gray-600"
                        }
                        bgColor={
                            activeTab === "content"
                                ? "bg-[#ED1651]"
                                : "bg-gray-200"
                        }
                        onclick={() => setActiveTab("content")}
                    />
                    <Button
                        text="Danh sách đã ủng hộ"
                        textColor={
                            activeTab === "donors"
                                ? "text-white"
                                : "text-gray-600"
                        }
                        bgColor={
                            activeTab === "donors"
                                ? "bg-[#ED1651]"
                                : "bg-gray-200"
                        }
                        onclick={() => setActiveTab("donors")}
                    />
                </div>
                <div className="w-full bg-gray-200 h-[1px] mt-2"></div>
                {activeTab === "content" ? (
                    <div className="w-full flex mt-4 gap-4">
                        <div className="w-4/5">
                            <p className="text-justify text-[#7A7A7A] leading-relaxed text-lg">
                                {campaign?.description}
                            </p>
                        </div>

                        <div className="w-2/5 flex flex-col gap-4  bg-[#f6f3f1] p-4">
                            <span className="text-[#7A7A7A] text-lg">
                                Thông tin tổ chức gây quỹ
                            </span>
                            <div className="w-full flex items-center gap-4">
                                <img
                                    src={campaign?.organization?.image}
                                    className="w-[50px] h-[50px] object-cover rounded-full "
                                />
                                <span className="font-semibold text-xl">
                                    {campaign?.organization?.name}
                                </span>
                            </div>
                            <p className="text-justify text-[#7A7A7A]">
                                {campaign?.organization?.description}
                            </p>
                            <div className="flex items-center gap-4">
                                <span>
                                    <CiLocationOn color="#7A7A7A" size={20} />
                                </span>
                                <span className="text-[#7A7A7A]">
                                    {campaign?.organization?.address}
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span>
                                    <CiMobile3 color="#7A7A7A" size={20} />
                                </span>
                                <span className="text-[#7A7A7A]">
                                    Hotline:{" "}
                                    <span className="text-[#ed1651] font-medium">
                                        {campaign?.organization?.phone}
                                    </span>
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span>
                                    <CiMail color="#7A7A7A" size={20} />
                                </span>
                                <span className="text-[#7A7A7A]">
                                    {campaign?.organization?.email}
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <span className="text-3xl font-semibold">
                            Danh sách đã ủng hộ
                        </span>
                        <div className="w-full bg-gray-200 h-[1px] mt-2"></div>
                        <table className="w-full mt-4 border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-200 text-gray-800">
                                    <th className="px-4 py-2">Người ủng hộ</th>
                                    <th className="px-4 py-2">Số tiền</th>
                                    <th className="px-4 py-2">Ngày ủng hộ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaign?.donations?.map((donor, index) => {
                                    const formattedDate = moment(
                                        donor.donationDate
                                    ).format("HH:mm:ss - DD/MM/YYYY");

                                    return (
                                        <tr
                                            key={index}
                                            className="text-center border border-gray-200"
                                        >
                                            <td className="px-4 py-2">
                                                {donor.user.name}
                                            </td>
                                            <td className="px-4 py-2">
                                                {formatCurrency(donor.amount)}
                                            </td>
                                            <td className="px-4 py-2">
                                                {formattedDate}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <div className="w-full flex flex-col gap-10 items-center justify-center bg-[#f6f3f1] h-[700px] mt-10">
                <span className="text-4xl font-semibold">Các dự án khác</span>
                <Campaign
                    campaigns={otherCampaigns}
                    onCampaignClick={handleCampaignDetailClick}
                />
            </div>
            <Modal
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
            />
            <Footer />
        </div>
    );
};

export default CampaignDetail;
