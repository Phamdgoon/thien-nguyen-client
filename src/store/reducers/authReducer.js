import actionTypes from "../actions/actionTypes";
const initState = {
    isLoggedIn: false,
    token: null,
    userId: null,
    organizationId: null,
    msg: "",
    update: false,
};
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS:
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: action.data.token,
                userId: action.data.userId,
                organizationId: action.data.organizationId,
                msg: "",
            };
        case actionTypes.REGISTER_FAIL:
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                msg: action.data,
                token: null,
                userId: null,
                organizationId: null,
                update: !state.update,
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                userId: null,
                organizationId: null,
                msg: "",
            };
        default:
            return state;
    }
};

export default authReducer;
