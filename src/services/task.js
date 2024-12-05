import axiosConfig from "../axiosConfig";

export const apiGetTaskTypes = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/v1/task/get-all",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const apiAssignTask = (taskTypeId, volunteerId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "post",
                url: `/api/v1/task/assign-task?id=${volunteerId}`,
                data: { taskTypeId },
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
