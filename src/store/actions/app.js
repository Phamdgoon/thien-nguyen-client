import actionTypes from "./actionTypes";
import * as api from "../../services";

export const getCategories = () => async (dispatch) => {
    try {
        const response = await api.apiGetCategories();

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CATEGORIES,
                categories: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.GET_CATEGORIES,
                msg: response.data.msg,
                categories: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CATEGORIES,
            categories: null,
        });
    }
};

export const getCampaignByCategory = (categoryCode) => async (dispatch) => {
    try {
        const response = await api.apiGetCampaignByCategory(categoryCode);

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CAMPAIGN_BY_CATEGORY,
                category: response.data.response,
                campaigns: response.data.response || [],
            });
        } else {
            dispatch({
                type: actionTypes.GET_CAMPAIGN_BY_CATEGORY,
                msg: response.data.msg,
                category: null,
                campaigns: [],
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CAMPAIGN_BY_CATEGORY,
            category: null,
            campaigns: [],
        });
    }
};
