import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(
    function (config) {
        const tokenType = config.headers["X-Token-Type"] || "user";
        let token = null;

        if (tokenType === "user") {
            token = localStorage.getItem("userToken");
        } else if (tokenType === "admin") {
            token = localStorage.getItem("adminToken");
        } else if (tokenType === "organization") {
            token = localStorage.getItem("organizationToken");
        }

        config.headers = {
            ...config.headers,
            authorization: token ? `Bearer ${token}` : null,
        };

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Refresh token nếu cần
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance;
