import React, { memo, useEffect, useState } from "react";
import icons from "../../utils/icons";
import { InputFormV2 } from "../../components";
import moment from "moment";
import { apiApprovedCampaign } from "../../services/campaign";
import Swal from "sweetalert2";

const { IoMdClose } = icons;

const ModalCampaignDetail = ({
    isOpen,
    closeModal,
    campaign,
    reloadCampaign,
}) => {
    const [formData, setFormData] = useState({});
    const [invalidFields, setInvalidFields] = useState([]);

    const handleChange = (key) => (value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        if (campaign) {
            setFormData({
                title: campaign?.title || "",
                description: campaign?.description || "",
                startDate:
                    moment(campaign?.startDate).format("DD/MM/YYYY") || "",
                endDate: moment(campaign?.endDate).format("DD/MM/YYYY") || "",
                status: campaign?.status.name || "",
                image: campaign?.images[0]?.image || "",
                targetAmount: campaign?.targetAmount || "",
                category: campaign?.category?.value || "",
                id: campaign.id || "",
            });
        }
    }, [campaign]);
    const handleApprovedCampaign = async (e, campaignId) => {
        e.preventDefault();
        const response = await apiApprovedCampaign(campaignId);

        if (response.data.err === 0) {
            Swal.fire("Success!", "Duyệt campaign thành công!", "success");
            reloadCampaign();
            closeModal();
        } else {
            Swal.fire("Oops!", "Duyệt campaign thất bại~~", "error");
        }
    };
    const isCampaignPending = formData.status === "Chưa duyệt";

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white w-[800px] p-6 rounded-lg relative">
                <button
                    className="absolute top-2 right-2 text-gray-500"
                    onClick={closeModal}
                >
                    <IoMdClose size={20} />
                </button>
                <h2 className="text-xl font-semibold text-center">
                    Chi tiết chiến dịch
                </h2>

                <div className="flex flex-col gap-4">
                    {campaign ? (
                        <form>
                            <div className="w-full flex gap-4">
                                <div className="w-full">
                                    <InputFormV2
                                        label="Tiêu đề"
                                        value={formData.title || ""}
                                        setValue={handleChange("title")}
                                        keyPayload="title"
                                        invalidFields={invalidFields}
                                        setinvalidFields={setInvalidFields}
                                        readOnly={true}
                                    />
                                </div>
                            </div>

                            <div className="w-full mt-2 flex gap-4">
                                {formData.image && (
                                    <img
                                        src={formData.image}
                                        alt="Campaign"
                                        className="w-[180px] h-[140px] rounded-lg"
                                    />
                                )}
                                <div className="w-full">
                                    <textarea
                                        cols="74"
                                        rows="5"
                                        label="Mô tả"
                                        value={formData.description || ""}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="w-full flex gap-4">
                                <div className="w-full">
                                    <InputFormV2
                                        label="Số tiền mục tiêu"
                                        value={formData.targetAmount || ""}
                                        setValue={handleChange("targetAmout")}
                                        keyPayload="targetAmout"
                                        invalidFields={invalidFields}
                                        setinvalidFields={setInvalidFields}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="w-full">
                                    <InputFormV2
                                        label="Danh mục"
                                        value={formData.category || ""}
                                        setValue={handleChange("category")}
                                        keyPayload="category"
                                        invalidFields={invalidFields}
                                        setinvalidFields={setInvalidFields}
                                        readOnly={true}
                                    />
                                </div>
                            </div>

                            <div className="w-full flex gap-4">
                                <div className="w-full">
                                    <InputFormV2
                                        label="Ngày bắt đầu"
                                        value={formData.startDate || ""}
                                        setValue={handleChange("startDate")}
                                        keyPayload="startDate"
                                        invalidFields={invalidFields}
                                        setinvalidFields={setInvalidFields}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="w-full">
                                    <InputFormV2
                                        label="Ngày kết thúc"
                                        value={formData.endDate || ""}
                                        setValue={handleChange("endDate")}
                                        keyPayload="endDate"
                                        invalidFields={invalidFields}
                                        setinvalidFields={setInvalidFields}
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex gap-4">
                                <div className="w-full">
                                    <InputFormV2
                                        label="Trạng thái"
                                        value={formData.status || ""}
                                        setValue={handleChange("status")}
                                        keyPayload="status"
                                        invalidFields={invalidFields}
                                        setinvalidFields={setInvalidFields}
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    className={`${
                                        isCampaignPending
                                            ? "text-white bg-[#ED1651]"
                                            : "text-white bg-gray-400 cursor-not-allowed"
                                    } px-6 py-2 rounded`}
                                    onClick={(e) =>
                                        isCampaignPending
                                            ? handleApprovedCampaign(
                                                  e,
                                                  campaign.id
                                              )
                                            : null
                                    }
                                    disabled={!isCampaignPending}
                                >
                                    Duyệt
                                </button>
                            </div>
                        </form>
                    ) : (
                        <p>Không có thông tin chiến dịch</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(ModalCampaignDetail);
