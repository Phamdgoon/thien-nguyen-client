import actionTypes from "../actions/actionTypes";

const initialState = {
    loading: false,
    error: null,
    successMessage: null,
    allVolunteers: [],
    approvedVolunteers: [],
    notApprovedVolunteers: [],
};

const volunteerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_VOLUNTEER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                successMessage: null,
            };
        case actionTypes.REGISTER_VOLUNTEER_SUCCESS:
            return {
                ...state,
                loading: false,
                successMessage: action.payload.msg,
            };
        case actionTypes.REGISTER_VOLUNTEER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionTypes.GET_ALL_VOLUNTEER:
            return {
                ...state,
                allVolunteers: action.allVolunteers,
                error: null,
            };
        case actionTypes.GET_APPROVED_VOLUNTEER:
            return {
                ...state,
                approvedVolunteers: action.approvedVolunteers,
                error: null,
            };
        case actionTypes.GET_NOT_APPROVED_VOLUNTEER:
            return {
                ...state,
                notApprovedVolunteers: action.notApprovedVolunteers,
                error: null,
            };
        default:
            return state;
    }
};

export default volunteerReducer;
