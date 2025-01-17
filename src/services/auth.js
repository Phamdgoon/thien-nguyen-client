import axiosConfig from "../axiosConfig";

export const apiRegister = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "post",
                url: "/api/v1/auth/register",
                data: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const apiLogin = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "post",
                url: "/api/v1/auth/login",
                data: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const apiLoginOrganization = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "post",
                url: "/api/v1/auth/login-organization",
                data: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const apiLoginAdmin = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "post",
                url: "/api/v1/auth/login-admin",
                data: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
