import axiosConfig from "../axiosConfig";

export const apiGetCurrent = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/v1/user/get-current",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiUpdateUser = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "put",
                url: "/api/v1/user/update-user",
                data: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetAllUser = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/v1/user/get-all",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const apiDeleteUser = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "delete",
                url: `/api/v1/user/delete`,
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
export const apiChat = (message) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "post",
                url: `/api/v1/user/chat`,
                data: { message },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
