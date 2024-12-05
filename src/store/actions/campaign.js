import actionTypes from "./actionTypes";
import {
    apiGetCampaigns,
    apiGetCampaignById,
    apiGetCampaignLimitOrganization,
} from "../../services/campaign";

export const getCampaigns = () => async (dispatch) => {
    try {
        const response = await apiGetCampaigns();

        if (response?.data.err === 0) {
            const {
                response: campaigns,
                activeCampaigns: activeCampaigns,
                expiredCampaigns: expiredCampaigns,
                notApprovedCampaigns: notApprovedCampaigns,
            } = response.data;
            dispatch({
                type: actionTypes.GET_CAMPAIGNS,
                campaigns: campaigns,
            });
            dispatch({
                type: actionTypes.GET_ACTIVE_CAMPAIGNS,
                activeCampaigns: activeCampaigns,
            });
            dispatch({
                type: actionTypes.GET_EXPIRED_CAMPAIGNS,
                expiredCampaigns: expiredCampaigns,
            });
            dispatch({
                type: actionTypes.GET_NOT_APPROVED_CAMPAIGN,
                notApprovedCampaigns: notApprovedCampaigns,
            });
        } else {
            dispatch({
                type: actionTypes.GET_CAMPAIGNS,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CAMPAIGNS,
            campaigns: null,
        });
    }
};

export const getCampaignById = (campaignId) => async (dispatch) => {
    try {
        const response = await apiGetCampaignById(campaignId);

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CAMPAIGN_BY_ID,
                campaign: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.GET_CAMPAIGN_BY_ID,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CAMPAIGN_BY_ID,
            campaign: null,
        });
    }
};

export const getActiveCampaigns = () => async (dispatch) => {
    try {
        const response = await apiGetCampaigns();

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_ACTIVE_CAMPAIGNS,
                activeCampaigns: response.data.activeCampaigns || [],
            });
        } else {
            dispatch({
                type: actionTypes.GET_ACTIVE_CAMPAIGNS,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ACTIVE_CAMPAIGNS,
            campaigns: [],
        });
    }
};

export const getExpiredCampaigns = () => async (dispatch) => {
    try {
        const response = await apiGetCampaigns();

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_EXPIRED_CAMPAIGNS,
                expiredCampaigns: response.data.expiredCampaigns || [],
            });
        } else {
            dispatch({
                type: actionTypes.GET_EXPIRED_CAMPAIGNS,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_EXPIRED_CAMPAIGNS,
            campaigns: [],
        });
    }
};

export const getCampaignLimitOrganization = () => async (dispatch) => {
    try {
        const response = await apiGetCampaignLimitOrganization();
        if (response?.data.err === 0) {
            const {
                response: allCampaignOrganization,
                activeCampaigns: activeCampaignOrganization,
                expiredCampaigns: expiredCampaignOrganization,
                notApprovedCampaigns: notApprovedCampaignOrganization,
            } = response.data;

            dispatch({
                type: actionTypes.GET_CAMPAIGN_ORGANIZATION,
                campaignOrganization: allCampaignOrganization,
            });

            dispatch({
                type: actionTypes.GET_ACTIVE_CAMPAIGN_ORGANIZATION,
                activeCampaignOrganization: activeCampaignOrganization,
            });

            dispatch({
                type: actionTypes.GET_EXPIRED_CAMPAIGN_ORGANIZATION,
                expiredCampaignOrganization: expiredCampaignOrganization,
            });
            dispatch({
                type: actionTypes.GET_NOT_APPROVED_CAMPAIGN_ORGANIZATION,
                notApprovedCampaignOrganization:
                    notApprovedCampaignOrganization,
            });
        } else {
            dispatch({
                type: actionTypes.GET_CAMPAIGN_ORGANIZATION,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CAMPAIGN_ORGANIZATION,
            campaigns: null,
            msg: "Failed to fetch campaigns",
        });
    }
};
