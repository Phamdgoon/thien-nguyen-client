import actionTypes from "../actions/actionTypes";

const initState = {
    organizations: [],
    msg: "",
};

const organizationReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_ORGANIZATION:
            return {
                ...state,
                organizations: action.organizations || [],
                msg: action.msg || "",
            };
        default:
            return state;
    }
};

export default organizationReducer;
