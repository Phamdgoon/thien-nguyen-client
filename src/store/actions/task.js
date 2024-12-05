import actionTypes from "./actionTypes";

import { apiGetTaskTypes } from "../../services/task";

export const getTaskTypes = () => async (dispatch) => {
    try {
        const response = await apiGetTaskTypes();

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_TASK_TYPES,
                taskTypes: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.GET_TASK_TYPES,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TASK_TYPES,
            campaigns: null,
        });
    }
};
