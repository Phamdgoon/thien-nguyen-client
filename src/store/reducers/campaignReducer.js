import actionTypes from "../actions/actionTypes";

const initState = {
    campaigns: [],
    campaign: {},
    activeCampaigns: [],
    expiredCampaigns: [],
    notApprovedCampaigns: [],
    campaignOrganization: [],
    activeCampaignOrganization: [],
    expiredCampaignOrganization: [],
    notApprovedCampaignOrganization: [],
    msg: "",
    count: 0,
};

const campaignReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CAMPAIGNS:
            return {
                ...state,
                campaigns: action.campaigns || [],
                msg: action.msg || "",
            };
        case actionTypes.GET_CAMPAIGN_BY_ID:
            return {
                ...state,
                campaign: action.campaign || {},
                msg: action.msg || "",
            };
        case actionTypes.GET_ACTIVE_CAMPAIGNS:
            return {
                ...state,
                activeCampaigns: action.activeCampaigns || [],
                msg: action.msg || "",
            };
        case actionTypes.GET_EXPIRED_CAMPAIGNS:
            return {
                ...state,
                expiredCampaigns: action.expiredCampaigns || [],
                msg: action.msg || "",
            };
        case actionTypes.GET_NOT_APPROVED_CAMPAIGN:
            return {
                ...state,
                notApprovedCampaigns: action.notApprovedCampaigns || [],
                msg: action.msg || "",
            };
        case actionTypes.GET_CAMPAIGN_ORGANIZATION:
            return {
                ...state,
                campaignOrganization: action.campaignOrganization || [],
                msg: action.msg || "",
            };
        case actionTypes.GET_ACTIVE_CAMPAIGN_ORGANIZATION:
            return {
                ...state,
                activeCampaignOrganization:
                    action.activeCampaignOrganization || [],
                msg: action.msg || "",
            };
        case actionTypes.GET_EXPIRED_CAMPAIGN_ORGANIZATION:
            return {
                ...state,
                expiredCampaignOrganization:
                    action.expiredCampaignOrganization || [],
                msg: action.msg || "",
            };
        case actionTypes.GET_NOT_APPROVED_CAMPAIGN_ORGANIZATION:
            return {
                ...state,
                notApprovedCampaignOrganization:
                    action.notApprovedCampaignOrganization || [],
                msg: action.msg || "",
            };
        default:
            return state;
    }
};

export default campaignReducer;
