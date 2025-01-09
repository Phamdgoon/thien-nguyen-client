import Header from "./Header";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { Campaign } from "../../components";
import { formatTitleForUrl } from "../../utils/Common/formatTitleForUrl ";
import { useNavigate } from "react-router-dom";
import { path } from "../../utils/constant";
import Footer from "./Footer";

const ProjectCampaign = () => {
    const [activeTab, setActiveTab] = useState("active");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const activeCampaigns = useSelector(
        (state) => state.campaign.activeCampaigns
    );
    const expiredCampaigns = useSelector(
        (state) => state.campaign.expiredCampaigns
    );

    useEffect(() => {
        if (activeTab === "active") {
            dispatch(actions.getActiveCampaigns());
        } else if (activeTab === "expired") {
            dispatch(actions.getExpiredCampaigns());
        }
    }, [dispatch, activeTab]);
    const handleCampaignClick = (title, campaignId) => {
        const formattedTitle = formatTitleForUrl(title);
        navigate(
            `/${path.DETAIL_CAMPAIGN_TITLE_CAMPAIGNID.replace(
                ":title",
                formattedTitle
            ).replace(":campaignId", campaignId)}`
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <Header />
            <div className="w-full relative py-10">
                <img
                    src="https://givenow.vn/wp-content/uploads/2022/03/banner-3.jpg"
                    className="w-full h-[300px] object-cover opacity-50"
                />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#ED1651] font-bold text-5xl">
                    Dự án
                </span>
            </div>
            <div className="w-full mb-4">
                <div className="flex items-center justify-center border-b border-gray-300">
                    <div className="w-1/2 flex justify-center">
                        <button
                            onClick={() => setActiveTab("active")}
                            className={`w-full px-6 py-2 font-medium text-lg ${
                                activeTab === "active"
                                    ? "text-[#ED1651] border-b-2 border-[#ED1651]"
                                    : "text-gray-500"
                            }`}
                        >
                            Dự án đang gây quỹ
                        </button>
                    </div>
                    <div className="w-1/2 flex justify-center">
                        <button
                            onClick={() => setActiveTab("expired")}
                            className={`w-full px-6 py-2 font-medium text-lg ${
                                activeTab === "expired"
                                    ? "text-[#ED1651] border-b-2 border-[#ED1651]"
                                    : "text-gray-500"
                            }`}
                        >
                            Dự án đã kết thúc
                        </button>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    {activeTab === "active" ? (
                        <div>
                            <div className="mb-8 flex flex-col gap-4">
                                <h2 className="text-2xl font-semibold text-gray-700">
                                    Các dự án đang gây quỹ
                                </h2>
                                <p className="text-gray-500">
                                    Hãy lựa chọn dự án trong lĩnh vực mà bạn
                                    quan tâm nhất
                                </p>
                            </div>
                            <Campaign
                                campaigns={activeCampaigns}
                                onCampaignClick={handleCampaignClick}
                            />
                        </div>
                    ) : (
                        <div>
                            <div className="mb-6 flex flex-col gap-4">
                                <h2 className="text-2xl font-semibold text-gray-700">
                                    Các dự án đã kết thúc
                                </h2>
                                <p className="text-gray-500">
                                    Hãy lựa chọn dự án trong lĩnh vực mà bạn
                                    quan tâm nhất
                                </p>
                            </div>
                            <Campaign
                                campaigns={expiredCampaigns}
                                onCampaignClick={handleCampaignClick}
                            />
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProjectCampaign;
