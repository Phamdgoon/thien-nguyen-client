import actionTypes from "./actionTypes";
import {
    apiRegister,
    apiLogin,
    apiLoginOrganization,
    apiLoginAdmin,
} from "../../services/auth";
import { getCurrent } from "./user";
export const register = (payload) => async (dispatch) => {
    try {
        const response = await apiRegister(payload);
        const { token } = response.data;

        localStorage.setItem("userToken", token);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                data: { token },
            });
        } else {
            dispatch({
                type: actionTypes.REGISTER_FAIL,
                data: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            data: null,
        });
    }
};

export const login = (payload) => async (dispatch) => {
    try {
        const response = await apiLogin(payload);

        if (response?.data.err === 0) {
            const { token, roleName, userId } = response.data;

            localStorage.setItem("userToken", token);

            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: { token, userId, roleName },
            });
            dispatch(getCurrent());
            return { token, roleName, userId };
        } else {
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                data: response.data.msg,
            });
            return { err: response.data.err, msg: response.data.msg };
        }
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: null,
        });
    }
};
export const loginAdmin = (payload) => async (dispatch) => {
    try {
        const response = await apiLoginAdmin(payload);

        if (response?.data.err === 0) {
            const { token, userId, roleName } = response.data;

            localStorage.setItem("adminToken", token);

            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: { token, userId, roleName },
            });
            return { token, userId, roleName };
        } else {
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                data: response.data.msg,
            });
            return { err: response.data.err, msg: response.data.msg };
        }
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: null,
        });
    }
};
export const loginOrganization = (payload) => async (dispatch) => {
    try {
        const response = await apiLoginOrganization(payload);
        if (response?.data.err === 0) {
            const { token, organizationId } = response.data;
            localStorage.setItem("organizationToken", token);

            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: { token, organizationId },
            });
            return { success: true };
        } else {
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                data: response.data.msg,
            });
            return { success: false, msg: response.data.msg };
        }
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: null,
        });
    }
};

export const logout = (tokenType) => (dispatch) => {
    if (tokenType === "user") {
        localStorage.removeItem("userToken");
    } else if (tokenType === "admin") {
        localStorage.removeItem("adminToken");
    } else if (tokenType === "organization") {
        localStorage.removeItem("organizationToken");
    }

    dispatch({
        type: actionTypes.LOGOUT,
    });
};
