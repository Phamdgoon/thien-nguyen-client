import actionTypes from "./actionTypes";

import { apiGetAllOrganization } from "../../services/organization";

export const getAllOrganization = () => async (dispatch) => {
    try {
        const response = await apiGetAllOrganization();

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_ALL_ORGANIZATION,
                organizations: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.GET_ALL_ORGANIZATION,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_ORGANIZATION,
            organizations: null,
        });
    }
};
