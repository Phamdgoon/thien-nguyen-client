import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { apiGetDonationById } from "../../services/user";

const DonationHistory = () => {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const response = await apiGetDonationById();
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
                console.error("Failed to fetch donations:", error);
            }
        };

        fetchDonations();
    }, []);
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
                    className="w-full object-cover"
                    alt="Donation banner"
                />
            </div>
            <div className="w-full flex flex-col gap-6 p-6">
                <h1 className="font-medium text-3xl py-4 border-b border-gray-300">
                    Lịch sử ủng hộ
                </h1>
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 py-2 px-4">
                                STT
                            </th>
                            <th className="border border-gray-300 py-2 px-4">
                                Tên chiến dịch
                            </th>
                            <th className="border border-gray-300 py-2 px-4">
                                Số tiền
                            </th>
                            <th className="border border-gray-300 py-2 px-4">
                                Thời gian ủng hộ
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.length > 0 ? (
                            donations.map((donation, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 py-2 px-4">
                                        {index + 1}
                                    </td>
                                    <td className="border border-gray-300 py-2 px-4">
                                        {donation?.campaign?.title}
                                    </td>
                                    <td className="border border-gray-300 py-2 px-4 text-right">
                                        {formatCurrency(donation.amount)}
                                    </td>
                                    <td className="border border-gray-300 py-2 px-4 text-center">
                                        {new Date(
                                            donation?.payment?.paymentDate
                                        ).toLocaleDateString("vi-VN")}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="border border-gray-300 py-2 px-4 text-center text-gray-500"
                                >
                                    Không có lịch sử ủng hộ
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
};

export default DonationHistory;
