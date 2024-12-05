import axiosConfig from "../axiosConfig";

export const apiGetAllOrganization = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/v1/organization/get-all",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiDeleteOrganization = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "delete",
                url: `/api/v1/organization/delete`,
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
