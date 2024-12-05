import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Campaign from "../../components/Campaign";
import { formatTitleForUrl } from "../../utils/Common/formatTitleForUrl ";
import { path } from "../../utils/constant";
import { useNavigate } from "react-router-dom";

const CampaignCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categoryCode } = useParams();
    const { category, campaigns } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(actions.getCampaignByCategory(categoryCode));
    }, [categoryCode, dispatch]);
    const handleCampaignClick = (title, campaignId) => {
        const formattedTitle = formatTitleForUrl(title);
        navigate(
            `/${path.DETAIL_CAMPAIGN_TITLE_CAMPAIGNID.replace(
                ":title",
                formattedTitle
            ).replace(":campaignId", campaignId)}`
        );
    };
    return (
        <div className="w-full flex flex-col items-center">
            <Header />
            <div className="w-full relative py-10">
                <img
                    src="https://givenow.vn/wp-content/uploads/2022/03/banner-3.jpg"
                    className="w-full h-[300px] object-cover opacity-50"
                />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#ED1651] font-bold text-5xl">
                    {category?.category?.value || "Chưa có dự án"}
                </span>
            </div>
            <div className="w-full mb-4 flex flex-wrap gap-5 justify-center">
                {campaigns && campaigns.length > 0 ? (
                    <Campaign
                        campaigns={campaigns}
                        onCampaignClick={handleCampaignClick}
                    />
                ) : (
                    <div className="w-full text-center">
                        Không có chiến dịch nào
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CampaignCategory;
