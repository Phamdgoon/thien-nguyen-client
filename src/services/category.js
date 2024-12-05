import axiosConfig from "../axiosConfig";

export const apiGetCategories = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/v1/category/get-categories",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const apiGetCampaignByCategory = (categoryCode) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/v1/category/get-campaign-by-category",
                params: {
                    categoryCode: categoryCode,
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
