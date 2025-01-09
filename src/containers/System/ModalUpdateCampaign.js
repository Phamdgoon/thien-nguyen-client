import React, { memo, useEffect, useState } from "react";
import { InputFormV2 } from "../../components";
import moment from "moment";
import Swal from "sweetalert2";
import icons from "../../utils/icons";
import { apiUpdateCampaign } from "../../services/campaign";
const { IoMdClose } = icons;

const ModalUpdateCampaign = ({ isOpen, closeModal, campaign }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        targetAmount: "",
        category: "",
        id: "",
        image: "",
        status: "",
    });
    const [invalidFields, setInvalidFields] = useState([]);

    const handleChange = (key) => (value) => {
        if (key === "targetAmount") {
            const rawValue = value.replace(/[^0-9]/g, "");
            const formattedValue = parseInt(rawValue || "0", 10)
                .toLocaleString("vi-VN")
                .replace(/,/g, ".");
            setFormData((prev) => ({ ...prev, [key]: `${formattedValue}đ` }));
        } else {
            setFormData((prev) => ({ ...prev, [key]: value }));
        }
    };

    useEffect(() => {
        if (campaign) {
            setFormData({
                title: campaign.title || "",
                description: campaign.description || "",
                startDate: campaign.startDate
                    ? moment(campaign.startDate).format("YYYY-MM-DD")
                    : "",
                endDate: campaign.endDate
                    ? moment(campaign.endDate).format("YYYY-MM-DD")
                    : "",
                targetAmount: campaign.targetAmount || "",
                status: campaign?.status.name || "",
                image: campaign?.images[0]?.image || "",
                category: campaign.category?.value || "",
                id: campaign.id || "",
            });
        }
    }, [campaign]);

    const handleUpdate = async (e, campaignId) => {
        e.preventDefault();
        const updateData = { ...formData };
        if (updateData.targetAmount) {
            updateData.targetAmount = parseInt(
                updateData.targetAmount.replace(/[^0-9]/g, ""),
                10
            );
        }

        if (Object.keys(updateData).length === 0) {
            Swal.fire(
                "Thông báo",
                "Không có thay đổi nào để cập nhật.",
                "info"
            );
            return;
        }

        try {
            const response = await apiUpdateCampaign(campaignId, updateData);

            if (response.data.err === 0) {
                Swal.fire(
                    "Success!",
                    "Cập nhật chiến dịch thành công!",
                    "success"
                );
                closeModal();
            } else {
                Swal.fire("Oops!", "Cập nhật chiến dịch thất bại~~", "error");
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            Swal.fire(
                "Lỗi",
                "Đã có lỗi xảy ra khi cập nhật chiến dịch.",
                "error"
            );
        }
    };

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
                    Cập nhật chiến dịch
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
                                    />
                                </div>
                            </div>

                            <div className="w-full mt-2 flex gap-4">
                                {formData.image && (
                                    <img
                                        src={formData.image}
                                        alt="Campaign"
                                        className="w-[200px] h-[180px] rounded-lg"
                                    />
                                )}
                                <div className="w-full">
                                    <textarea
                                        cols="72"
                                        rows="8"
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
                                        setValue={handleChange("targetAmount")}
                                        keyPayload="targetAmount"
                                        invalidFields={invalidFields}
                                        setinvalidFields={setInvalidFields}
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
                                        type="date"
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
                                    className="bg-[#ED1651] text-white px-4 py-2 rounded"
                                    onClick={(e) =>
                                        handleUpdate(e, campaign.id)
                                    }
                                >
                                    Cập nhật
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

export default memo(ModalUpdateCampaign);
