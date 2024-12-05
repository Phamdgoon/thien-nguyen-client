import React, { useState, useEffect } from "react";
import {
    apiGetDonationsByTime,
    apiGetCampaignsOrganizationByTime,
} from "../../services/report";
import { generateColors } from "../../utils/Common/generateColors";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const Report = () => {
    const [timeFilter, setTimeFilter] = useState("year");
    const [reportType, setReportType] = useState("donation");
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label:
                    reportType === "donation"
                        ? "Tổng số tiền ủng hộ"
                        : "Tổng số chiến dịch",
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (reportType === "donation") {
                    response = await apiGetDonationsByTime(timeFilter);
                    if (response.data.err === 0) {
                        const reportData = response.data.response;
                        const labels = reportData.map((item) => {
                            if (timeFilter === "month") {
                                return item.month;
                            } else if (timeFilter === "quarter") {
                                return `Q${item.quarter}`;
                            } else {
                                return item.year;
                            }
                        });
                        const data = reportData.map(
                            (item) => item.totalDonations
                        );

                        setChartData({
                            labels,
                            datasets: [
                                {
                                    label: "Tổng số tiền ủng hộ",
                                    data: data,
                                    backgroundColor: generateColors(
                                        data.length
                                    ),
                                    borderColor: generateColors(data.length),
                                    borderWidth: 1,
                                },
                            ],
                        });
                    }
                } else if (reportType === "campaign") {
                    response = await apiGetCampaignsOrganizationByTime(
                        timeFilter
                    );

                    if (response.data.err === 0) {
                        const reportData = response.data.response;
                        const labels = reportData.map((item) => {
                            if (timeFilter === "month") {
                                return `Tháng ${item.month}`;
                            } else if (timeFilter === "quarter") {
                                return `Quý ${item.quarter}`;
                            } else {
                                return item.year;
                            }
                        });

                        const data = reportData.map(
                            (item) => item.totalCampaigns
                        );

                        setChartData({
                            labels,
                            datasets: [
                                {
                                    label: "Tổng số chiến dịch",
                                    data: data,
                                    backgroundColor: generateColors(
                                        data.length
                                    ),
                                    borderColor: generateColors(data.length),
                                    borderWidth: 1,
                                },
                            ],
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [timeFilter, reportType]);

    return (
        <div className="flex flex-col gap-6 p-6 relative">
            <div className="py-4 border-b border-gray-300 flex items-center justify-between">
                <h1 className="font-medium text-3xl ">Báo cáo thống kê</h1>
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                        <select
                            value={timeFilter}
                            onChange={(e) => setTimeFilter(e.target.value)}
                            className="px-4 py-2 border rounded bg-white"
                        >
                            <option value="year">Theo năm</option>
                            <option value="quarter">Theo quý</option>
                            <option value="month">Theo tháng</option>
                        </select>
                    </div>

                    <div className="relative">
                        <select
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                            className="px-4 py-2 border rounded bg-white"
                        >
                            <option value="donation">
                                Tổng số tiền ủng hộ
                            </option>
                            <option value="campaign">Tổng số chiến dịch</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2 p-4 shadow-md border rounded">
                    <h2 className="text-lg font-semibold mb-2 text-center">
                        Biểu đồ tròn
                    </h2>
                    <Pie data={chartData} />
                </div>
                <div className="w-full md:w-1/2 p-4 shadow-md border rounded">
                    <h2 className="text-lg font-semibold mb-2 text-center">
                        Biểu đồ đường
                    </h2>
                    <Line data={chartData} />
                </div>
            </div>
        </div>
    );
};

export default Report;
