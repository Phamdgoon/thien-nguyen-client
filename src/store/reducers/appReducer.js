import actionTypes from "../actions/actionTypes";

const initState = {
    msg: "",
    categories: [],
    campaigns: [],
    category: null,
};

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CATEGORIES:
            return {
                ...state,
                categories: action.categories || [],
                msg: action.msg || "",
            };
        case actionTypes.GET_CAMPAIGN_BY_CATEGORY:
            return {
                ...state,
                category: action.category?.[0] || null,
                campaigns: action.campaigns || [],
                msg: action.msg || "",
            };

        default:
            return state;
    }
};

export default appReducer;
