import actionTypes from "./actionTypes";
import { apiGetCurrent, apiGetAllUser } from "../../services/user";

export const getCurrent = () => async (dispatch) => {
    try {
        const response = await apiGetCurrent();

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CURRENT,
                currentData: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.GET_CURRENT,
                currentData: response.data.msg,
                currentData: null,
            });
            dispatch({
                type: actionTypes.LOGOUT,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CURRENT,
            currentData: null,
            msg: error,
        });
        dispatch({
            type: actionTypes.LOGOUT,
        });
    }
};

export const getAllUser = () => async (dispatch) => {
    try {
        const response = await apiGetAllUser();

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_ALL_USER,
                users: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.GET_ALL_USER,
                users: response.data.msg,
                users: null,
            });
            dispatch({
                type: actionTypes.LOGOUT,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_USER,
            users: null,
            msg: error,
        });
        dispatch({
            type: actionTypes.LOGOUT,
        });
    }
};
