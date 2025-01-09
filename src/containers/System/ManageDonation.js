import React, { useEffect, useState } from "react";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { apiGetDonationByCampaignId } from "../../services/user";

const ManageDonation = () => {
    const dispatch = useDispatch();
    const { campaignOrganization } = useSelector((state) => state.campaign);
    const [campaign, setCampaign] = useState([]);
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        if (campaignOrganization) setCampaign(campaignOrganization);
    }, [campaignOrganization]);

    useEffect(() => {
        dispatch(actions.getCampaignLimitOrganization());
    }, []);

    const handleSelectChange = async (event) => {
        const campaignId = event.target.value;
        if (campaignId !== "0") {
            try {
                const response = await apiGetDonationByCampaignId(campaignId);
                if (response?.data) {
                    const sortedDonations = response.data.response.sort(
                        (a, b) =>
                            new Date(b.donationDate) - new Date(a.donationDate)
                    );
                    setDonations(sortedDonations);
                } else {
                    console.error("Response data is not an array!");
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setDonations([]);
        }
    };
    const formatCurrency = (amount) => {
        if (!amount) return "0đ";
        return parseFloat(amount).toLocaleString("vi-VN") + "đ";
    };
    const totalAmount = () => {
        return donations.reduce(
            (total, donation) => total + parseFloat(donation.amount || 0),
            0
        );
    };

    return (
        <div className="flex flex-col gap-6 p-6 relative">
            <div className="py-4 border-b border-gray-300 flex items-center justify-between">
                <h1 className="font-medium text-3xl">Quản lý ủng hộ</h1>
                <select
                    className="outline-none border border-gray-200 p-2"
                    onChange={handleSelectChange}
                >
                    <option value="0">Hãy chọn chiến dịch...</option>
                    {campaign.map((item, index) => (
                        <option key={index} value={item.id}>
                            {item.title}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 py-2 px-4">
                                STT
                            </th>
                            <th className="border border-gray-300 py-2 px-4">
                                Người ủng hộ
                            </th>
                            <th className="border border-gray-300 py-2 px-4">
                                Email
                            </th>
                            <th className="border border-gray-300 py-2 px-4">
                                Số tiền
                            </th>
                            <th className="border border-gray-300 py-2 px-4">
                                Ngày thanh toán
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 py-2 px-4 text-center">
                                    {index + 1}
                                </td>
                                <td className="border border-gray-300 py-2 px-4">
                                    {donation.user.name}
                                </td>
                                <td className="border border-gray-300 py-2 px-4 ">
                                    {donation.user.email}
                                </td>
                                <td className="border border-gray-300 py-2 px-4 text-center">
                                    {formatCurrency(donation.amount)}
                                </td>
                                <td className="border border-gray-300 py-2 px-4 text-center">
                                    {new Date(
                                        donation?.payment?.paymentDate
                                    ).toLocaleDateString("vi-VN")}
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-gray-100 font-medium">
                            <td
                                className="border border-gray-300 py-2 px-4 text-center"
                                colSpan="3"
                            >
                                Tổng cộng
                            </td>
                            <td
                                className="border border-gray-300 py-2 px-4 text-center"
                                colSpan="2"
                            >
                                {formatCurrency(totalAmount())}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageDonation;
