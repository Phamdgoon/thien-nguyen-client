import axiosConfig from "../axiosConfig";

export const apiRegisterVolunteer = (campaignId, data) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "post",
                url: `/api/v1/volunteer/register-volunteer/${campaignId}`,
                data: data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetAllVolunteer = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: `/api/v1/volunteer/get-all`,
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

export const apiDeleteVolunteer = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "delete",
                url: `/api/v1/volunteer/delete`,
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
export const apiApprovedVolunteer = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "post",
                url: `/api/v1/volunteer/approved-volunteer`,
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
export const apiGetVolunteerById = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: `/api/v1/volunteer/get-volunteer-by-id`,
                headers: {
                    "X-Token-Type": "user",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
