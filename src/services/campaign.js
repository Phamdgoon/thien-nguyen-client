import axiosConfig from "../axiosConfig";
import axios from "axios";

export const apiGetCampaigns = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/v1/campaign/get-all",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const apiGetCampaignById = (campaignId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/v1/campaign/get-campaign",
                params: {
                    id: campaignId,
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiUploadImages = (images) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                method: "post",
                url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload/`,
                data: images,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiCreateCampaign = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "post",
                url: "/api/v1/campaign/create-campaign",
                data: payload,
                headers: {
                    "X-Token-Type": "organization",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetCampaignLimitOrganization = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/v1/campaign/limit-organization",
                headers: {
                    "X-Token-Type": "organization",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiDeleteCampaign = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "delete",
                url: `/api/v1/campaign/delete`,
                params: { id },
                headers: {
                    "X-Token-Type": "organization",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const apiUpdateCampaign = (id, updateData) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "put",
                url: `/api/v1/campaign/update`,
                params: { id },
                data: updateData,
                headers: {
                    "X-Token-Type": "organization",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiApprovedCampaign = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "post",
                url: `/api/v1/campaign/approved-campaign`,
                params: { id },
                headers: {
                    "X-Token-Type": "admin",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetInfo = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: `/api/v1/campaign/get-info`,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
