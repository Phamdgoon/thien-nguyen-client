import actionTypes from "./actionTypes";
import { apiRegisterVolunteer, apiGetAllVolunteer } from "../../services";

export const registerVolunteer = (campaignId, data) => async (dispatch) => {
    dispatch({ type: actionTypes.REGISTER_VOLUNTEER_REQUEST });
    try {
        const response = await apiRegisterVolunteer(campaignId, data);

        if (response?.data?.err === 0) {
            dispatch({
                type: actionTypes.REGISTER_VOLUNTEER_SUCCESS,
                payload: response.data,
            });
            return response;
        } else {
            dispatch({
                type: actionTypes.REGISTER_VOLUNTEER_FAILURE,
                payload: response.data?.msg || "Có lỗi xảy ra",
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_VOLUNTEER_FAILURE,
            payload: error.message || "Lỗi khi gọi API",
        });
    }
};

export const getAllVolunteer = () => async (dispatch) => {
    try {
        const response = await apiGetAllVolunteer();

        if (response?.data?.err === 0) {
            const {
                data: allVolunteers,
                approvedVolunteer: approvedVolunteers,
                notApprovedVolunteer: notApprovedVolunteers,
            } = response.data;

            dispatch({
                type: actionTypes.GET_ALL_VOLUNTEER,
                allVolunteers: allVolunteers,
            });

            dispatch({
                type: actionTypes.GET_APPROVED_VOLUNTEER,
                approvedVolunteers: approvedVolunteers,
            });

            dispatch({
                type: actionTypes.GET_NOT_APPROVED_VOLUNTEER,
                notApprovedVolunteers: notApprovedVolunteers,
            });

            return response;
        } else {
            throw new Error(response.data?.msg || "Có lỗi xảy ra");
        }
    } catch (error) {
        console.error("Error in getAllVolunteer:", error);
        dispatch({
            type: actionTypes.GET_ALL_VOLUNTEER,
            allVolunteers: [],
        });
        dispatch({
            type: actionTypes.GET_APPROVED_VOLUNTEER,
            approvedVolunteers: [],
        });
        dispatch({
            type: actionTypes.GET_NOT_APPROVED_VOLUNTEER,
            notApprovedVolunteers: [],
        });
    }
};
