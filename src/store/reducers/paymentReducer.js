import actionTypes from "../actions/actionTypes";

const initialState = {
    loading: false,
    paymentData: null,
    error: null,
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PAYMENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case actionTypes.PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                paymentData: action.payload,
                error: null,
            };

        case actionTypes.PAYMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case actionTypes.PAYMENT_RESET:
            return {
                ...state,
                paymentData: null,
                error: null,
            };

        default:
            return state;
    }
};

export default paymentReducer;
