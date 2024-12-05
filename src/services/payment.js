import axiosConfig from "../axiosConfig";

export const apiPayment = (campaignId, amount) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "post",
                url: `/api/v1/payment/payment/${campaignId}`,
                data: { amount },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
