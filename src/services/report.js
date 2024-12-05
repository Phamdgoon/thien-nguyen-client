import axiosConfig from "../axiosConfig";

export const apiGetDonationsByTime = (timePeriod) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/v1/report/donation-by-time",
                params: { timePeriod },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const apiGetCampaignsOrganizationByTime = (timePeriod) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/v1/report/campaigns-organization-by-time",
                params: { timePeriod },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
