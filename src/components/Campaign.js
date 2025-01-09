import React, { memo } from "react";

const Campaign = ({ campaigns, onCampaignClick }) => {
    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex flex-wrap gap-5 cursor-pointer justify-center">
                {campaigns && campaigns.length > 0 ? (
                    campaigns.map((campaign, index) => {
                        const currentAmount =
                            parseFloat(
                                campaign?.currentAmount
                                    ?.toString()
                                    .replace(/[^\d]/g, "")
                            ) || 0;
                        const targetAmount =
                            parseFloat(
                                campaign?.targetAmount
                                    ?.toString()
                                    .replace(/[^\d]/g, "")
                            ) || 0;
                        const progressPercentage =
                            targetAmount > 0
                                ? (currentAmount / targetAmount) * 100
                                : 0;
                        return (
                            <div
                                key={index}
                                className="bg-white w-[380px] h-[531px] p-4 rounded-md shadow-2xl relative"
                                onClick={() =>
                                    onCampaignClick(campaign.title, campaign.id)
                                }
                            >
                                <img
                                    src={campaign?.images[0]?.image}
                                    alt="img"
                                    className="absolute top-0 left-0 w-full h-1/2 object-cover rounded-tl-md rounded-tr-md"
                                />
                                <div className="flex right-2 items-center justify-center px-4 py-2 bg-[#ED1651] rounded-md absolute">
                                    <span className="text-white">
                                        {campaign?.category?.value}
                                    </span>
                                </div>
                                <div className="w-[60px] h-[60px] rounded-full overflow-hidden top-[224px] left-[40px] absolute">
                                    <img
                                        src={campaign?.organization?.image}
                                        alt="Kite Image"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute top-1/2 w-4/5 mt-6 text-gray-500 font-semibold text-lg left-10">
                                    <span>{campaign?.organization?.name}</span>
                                </div>
                                <div className="absolute top-1/2 mt-20 text-black w-4/5 font-bold text-xl left-10 line-clamp-2">
                                    <span>{campaign?.title}</span>
                                </div>

                                <div className="absolute w-4/5 top-1/2 mt-20 rounded-md left-10">
                                    <div className="progress h-3 bg-gray-200 rounded-full mt-20">
                                        <div
                                            className="progress-bar bg-[#ED1651] h-full rounded-full"
                                            role="progressbar"
                                            style={{
                                                width: `${progressPercentage}%`,
                                            }}
                                            aria-valuenow={currentAmount}
                                            aria-valuemin="0"
                                            aria-valuemax={targetAmount}
                                        ></div>
                                    </div>
                                </div>
                                <div className="absolute bottom-14 font-bold text-xl left-10 w-4/5 flex justify-between">
                                    <span className="text-[#ED1651]">
                                        {campaign?.currentAmount}
                                    </span>
                                    <span className="text-black">
                                        {Math.round(progressPercentage)} %
                                    </span>
                                </div>
                                <span className="absolute left-10 bottom-4 text-lg text-gray-500 font-semibold">
                                    Với mục tiêu {campaign?.targetAmount}
                                </span>
                            </div>
                        );
                    })
                ) : (
                    <div className="w-full text-center">
                        Không có chiến dịch nào
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(Campaign);
