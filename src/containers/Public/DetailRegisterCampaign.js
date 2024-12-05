import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { apiGetVolunteerById } from "../../services";
import { InputFormV2 } from "../../components";

const DetailRegisterCampaign = () => {
    const [volunteerData, setVolunteerData] = useState(null);

    useEffect(() => {
        const fetchVolunteerData = async () => {
            try {
                const response = await apiGetVolunteerById();
                if (response.data.err === 0) {
                    setVolunteerData(response.data.data[0]);
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin tình nguyện viên:", error);
            }
        };

        fetchVolunteerData();
    }, []);
    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <Header />
            <div className="w-full relative py-10">
                <img
                    src="https://givenow.vn/wp-content/uploads/2022/03/banner-3.jpg"
                    className="w-full object-cover"
                />
            </div>
            <div className="mb-20 p-6 max-w-[1000px] mx-auto bg-white rounded-md shadow-md">
                <div className="text-center mb-6">
                    <h1 className="text-xl font-bold">
                        Chiến dịch đã đăng ký tình nguyện viên
                    </h1>
                </div>
                {volunteerData ? (
                    <div className="w-full px-6 py-8">
                        <InputFormV2
                            label="Tên chiến dịch"
                            value={
                                volunteerData?.volunteerCampaigns[0]?.campaign
                                    ?.title
                            }
                            readOnly={true}
                        />
                        <div className="w-full gap-2 flex items-center justify-between">
                            <InputFormV2
                                label="Ngày bắt đầu chiến dịch"
                                value={formatDate(
                                    volunteerData?.volunteerCampaigns[0]
                                        ?.campaign?.startDate
                                )}
                                readOnly={true}
                            />

                            <InputFormV2
                                label="Trạng thái đơn đăng ký"
                                value={volunteerData?.status?.name}
                                readOnly={true}
                            />
                        </div>

                        <InputFormV2
                            label="Tên nhiệm vụ"
                            value={volunteerData?.taskName}
                            readOnly={true}
                        />
                        <div className="w-full mt-4">
                            <span className="text-sm">Mô tả nhiệm vụ</span>
                            <textarea
                                id="desc"
                                cols="10"
                                rows="4"
                                className="w-full rounded-md outline-none border border-gray-200 p-2"
                                value={
                                    volunteerData?.tasks[0]?.taskType
                                        ?.description || "Không có mô tả."
                                }
                                readOnly={true}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <p>Bạn không có đơn đăng ký tình nguyện viên....</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default DetailRegisterCampaign;
