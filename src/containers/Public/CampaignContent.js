import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import * as actions from "../../store/actions";
import { Button, Campaign } from "../../components";
import { useNavigate, useLocation } from "react-router-dom";
import { path } from "../../utils/constant";
import icons from "../../utils/icons";
import { formatTitleForUrl } from "../../utils/Common/formatTitleForUrl ";
import { apiGetInfo } from "../../services/campaign";
import Chatbox from "./Chatbox";

const { GrLinkPrevious, GrLinkNext, IoChatbubbleEllipsesOutline } = icons;

const CampaignContent = () => {
    const dispatch = useDispatch();
    const { campaigns } = useSelector((state) => state.campaign);
    const { categories } = useSelector((state) => state.app);
    const [currentPage, setCurrentPage] = useState(0);
    const campaignsPerPage = 6;
    const [totalData, setTotalData] = useState({
        totalCampaign: 0,
        totalOrganization: 0,
        totalDonations: 0,
        totalAmount: 0,
    });
    const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const page = queryParams.get("page");
        if (page) {
            setCurrentPage(parseInt(page) - 1);
        } else {
            setCurrentPage(0);
        }
        dispatch(actions.getCampaigns());
        dispatch(actions.getCategories());
        apiGetInfo()
            .then((response) => {
                setTotalData({
                    totalCampaign: response.data.totalCampaign,
                    totalOrganization: response.data.totalOrganization,
                    totalDonations: response.data.totalDonations,
                    totalAmount: response.data.totalAmount,
                });
            })
            .catch((error) => {
                console.error("Failed to fetch total data", error);
            });
    }, [dispatch, location.search]);

    const offset = currentPage * campaignsPerPage;
    const filteredCampaigns = campaigns.filter(
        (campaign) =>
            campaign.statusId !== 1 && campaign.status.name !== "Chưa duyệt"
    );
    const currentCampaigns = filteredCampaigns.slice(
        offset,
        offset + campaignsPerPage
    );
    const pageCount = Math.ceil(filteredCampaigns.length / campaignsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
        navigate(`?page=${selected + 1}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCategoryClick = (categoryCode) => {
        navigate(
            `${path.CATEGORY_CAMPAIGNS.replace(":categoryCode", categoryCode)}`
        );
    };

    const handleCampaignClick = (title, campaignId) => {
        const formattedTitle = formatTitleForUrl(title);
        navigate(
            `/${path.DETAIL_CAMPAIGN_TITLE_CAMPAIGNID.replace(
                ":title",
                formattedTitle
            ).replace(":campaignId", campaignId)}`
        );
    };
    const formatAmount = (amount) => {
        if (amount >= 1e9) {
            return (amount / 1e9).toFixed(2) + " tỷ";
        } else if (amount >= 1e6) {
            return (amount / 1e6).toFixed(2) + " triệu";
        } else {
            return amount.toLocaleString();
        }
    };
    const toggleChatBox = () => {
        setIsChatBoxOpen(!isChatBoxOpen);
    };

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <h2 className="text-[36px] text-[#323232] font-bold text-center mb-6">
                Dự án đang gây quỹ
            </h2>
            <p className="text-[22px] font-[700] text-gray-600 mb-10">
                Hãy lựa chọn đồng hành cùng dự án mà bạn quan tâm
            </p>

            <div className="w-4/5 flex gap-6 mb-6 justify-center flex-wrap">
                {categories?.length > 0 &&
                    categories.map((item, index) => (
                        <div
                            key={index}
                            className="font-bold text-lg w-auto"
                            onClick={() => handleCategoryClick(item.code)}
                        >
                            <Button
                                text={item.value}
                                textColor="text-[#ED1651]"
                                bgColor="bg-[#f0f0f0]"
                                px="px-6"
                            />
                        </div>
                    ))}
            </div>

            <Campaign
                campaigns={currentCampaigns}
                onCampaignClick={handleCampaignClick}
            />

            {filteredCampaigns.length > 0 && (
                <ReactPaginate
                    previousLabel={<GrLinkPrevious color="white" size={26} />}
                    nextLabel={<GrLinkNext color="white" size={26} />}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={
                        "pagination flex justify-center mt-8 gap-4"
                    }
                    activeClassName={"bg-[#ED1651] text-white rounded-md"}
                    pageClassName={"page-item"}
                    pageLinkClassName={
                        "px-4 py-2 text-black bg-gray-200 rounded-md hover:bg-gray-300"
                    }
                    previousLinkClassName={
                        "px-3 py-2 bg-[#ED1651] text-white rounded-md flex items-center justify-center"
                    }
                    nextLinkClassName={
                        "px-3 py-2 bg-[#ED1651] text-white rounded-md flex items-center justify-center"
                    }
                />
            )}
            <div className="w-full relative mt-10">
                <img
                    src="https://givenow.vn/wp-content/uploads/2022/03/banner-3.jpg"
                    className="w-full h-[300px] object-cover opacity-50"
                />
                <div className="w-4/5 flex flex-col items-center gap-6 absolute top-[25%] left-1/2 transform -translate-x-1/2">
                    <span className="text-[#ED1651] font-bold text-4xl">
                        Những con số biết nói
                    </span>
                    <div className="flex items-center gap-40">
                        <div className="flex flex-col items-center">
                            <span className="text-[#ED1651] font-semibold text-2xl">
                                Dự án
                            </span>
                            <span className="text-[#ED1651] font-bold text-2xl">
                                {totalData.totalCampaign}
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-[#ED1651] font-semibold text-2xl">
                                Tổ chức
                            </span>
                            <span className="text-[#ED1651] font-bold text-2xl">
                                {totalData.totalOrganization}
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-[#ED1651] font-semibold text-2xl">
                                Lượt ủng hộ
                            </span>
                            <span className="text-[#ED1651] font-bold text-2xl">
                                {totalData.totalDonations}
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-[#ED1651] font-semibold text-2xl">
                                Tiền ủng hộ
                            </span>
                            <span className="text-[#ED1651] font-bold text-2xl">
                                {formatAmount(totalData.totalAmount)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={toggleChatBox}
                    className="bg-[#ED1651] p-4 rounded-full shadow-lg hover:opacity-80 text-white flex items-center justify-center"
                >
                    <IoChatbubbleEllipsesOutline size={28} />
                </button>

                {isChatBoxOpen && <Chatbox onClose={toggleChatBox} />}
            </div>
        </div>
    );
};

export default CampaignContent;
