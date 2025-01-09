import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { apiDeleteCampaign } from "../../services/campaign";
import Swal from "sweetalert2";
import ModalCampaignDetail from "./ModalCampaignDetail";
import moment from "moment";

const ManageCampaignAdmin = () => {
    const dispatch = useDispatch();
    const {
        campaigns,
        activeCampaigns,
        expiredCampaigns,
        notApprovedCampaigns,
    } = useSelector((state) => state.campaign);

    const [campaign, setCampaign] = useState([]);
    const [status, setStatus] = useState("0");
    const [updateData, setUpdateData] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);

    useEffect(() => {
        if (campaigns) setCampaign(campaigns);
    }, [campaigns]);

    useEffect(() => {
        dispatch(actions.getCampaigns());
    }, [updateData]);
    const reloadCampaign = () => {
        dispatch(actions.getCampaigns());
    };

    useEffect(() => {
        if (status === "1") {
            setCampaign(activeCampaigns || []);
        } else if (status === "2") {
            setCampaign(expiredCampaigns || []);
        } else if (status === "3") {
            setCampaign(notApprovedCampaigns || []);
        } else {
            setCampaign(campaigns || []);
        }
    }, [
        status,
        campaigns,
        activeCampaigns,
        expiredCampaigns,
        notApprovedCampaigns,
    ]);

    const handleDeleteCampaign = async (e, campaignId) => {
        e.stopPropagation();
        const response = await apiDeleteCampaign(campaignId);
        if (response.data.err === 0) {
            setUpdateData((prev) => !prev);
            Swal.fire("Success!", "Xóa chiến dịch thành công!", "success");
        } else {
            Swal.fire("Oops!", "Xóa chiến dịch thất bại~~", "error");
        }
    };
    const handleCampaignClick = (campaign) => {
        setSelectedCampaign(campaign);
    };

    const closeModal = () => {
        setSelectedCampaign(null);
    };

    return (
        <div className="flex flex-col gap-6 p-6 ralative">
            <div className="py-4 border-b border-gray-300 flex items-center justify-between">
                <h1 className="font-medium text-3xl ">Quản lý chiến dịch</h1>
                <select
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                    className="outline-none border border-gray-200 p-2"
                >
                    <option value="0">Tất cả chiến dịch</option>
                    <option value="1">Đang hoạt động</option>
                    <option value="2">Đã hết hạn</option>
                    <option value="3">Chưa duyệt</option>
                </select>
            </div>
            <table className="w-full table-auto ">
                <thead>
                    <tr className="flex w-full bg-gray-100">
                        <th className="border flex-1 py-2">STT</th>
                        <th className="border flex-1 py-2">Ảnh chiến dịch</th>
                        <th className="border flex-1 py-2">Tên chiến dịch</th>
                        <th className="border flex-1 py-2">Ngày bắt đầu</th>
                        <th className="border flex-1 py-2">Ngày kết thúc</th>
                        <th className="border flex-1 py-2">Số tiền mục tiêu</th>
                        <th className="border flex-1 py-2">Số tiền đạt được</th>
                        <th className="border flex-1 py-2">Trạng thái</th>
                        <th className="border flex-1 py-2">Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {campaign.length === 0 ? (
                        <tr>
                            <td colSpan="9" className="text-center py-4">
                                Không có chiến dịch nào
                            </td>
                        </tr>
                    ) : (
                        campaign.map((item, index) => (
                            <tr
                                className="flex items-center h-16 cursor-pointer"
                                key={item.id}
                                onClick={() => handleCampaignClick(item)}
                            >
                                <td className="border px-2 flex-1 h-full flex items-center justify-center ">
                                    {index + 1}
                                </td>
                                <td className="border flex-1 h-full flex items-center justify-center ">
                                    <img
                                        src={item?.images[0]?.image || ""}
                                        alt="avatar-post"
                                        className="w-10 h-10 object-cover rounded-md"
                                    />
                                </td>
                                <td className="border px-2 flex-1 h-full flex items-center justify-center ">
                                    {`${item?.title?.slice(0, 30)}...`}
                                </td>
                                <td className="border px-2 flex-1 h-full flex items-center justify-center ">
                                    {moment(item?.startDate).format(
                                        "DD/MM/YYYY"
                                    )}
                                </td>
                                <td className="border px-2 flex-1 h-full flex items-center justify-center ">
                                    {moment(item?.endDate).format("DD/MM/YYYY")}
                                </td>
                                <td className="border px-2 flex-1 h-full flex items-center justify-center ">
                                    {item?.targetAmount}
                                </td>
                                <td className="border px-2 flex-1 h-full flex items-center justify-center ">
                                    {item?.currentAmount}
                                </td>
                                <td className="border px-2 flex-1 h-full flex items-center justify-center ">
                                    {item?.status?.name}
                                </td>
                                <td className="border px-2 flex-1 h-full flex items-center justify-center gap-4">
                                    <button
                                        className="bg-red-600 text-white px-1 py-1 rounded"
                                        onClick={(e) =>
                                            handleDeleteCampaign(e, item.id)
                                        }
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {selectedCampaign && (
                <ModalCampaignDetail
                    isOpen={true}
                    closeModal={closeModal}
                    campaign={selectedCampaign}
                    reloadCampaign={reloadCampaign}
                />
            )}
        </div>
    );
};

export default ManageCampaignAdmin;
