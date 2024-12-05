import actionTypes from "./actionTypes";
import { apiPayment } from "../../services/payment";

export const Payment = (campaignId, amount) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.PAYMENT_REQUEST });

        const response = await apiPayment(campaignId, amount);

        if (response?.data?.resultCode === 0) {
            const payUrl = response.data.payUrl;

            dispatch({
                type: actionTypes.PAYMENT_SUCCESS,
                payload: response.data.paymentData,
            });
            return payUrl;
        } else {
            dispatch({
                type: actionTypes.PAYMENT_FAIL,
                payload: response?.data?.message || "Payment failed",
            });
            return null;
        }
    } catch (error) {
        dispatch({
            type: actionTypes.PAYMENT_FAIL,
            payload: error.response
                ? error.response.data.message
                : error.message,
        });
        return null;
    }
};
