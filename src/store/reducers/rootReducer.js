import authReducer from "./authReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";
import appReducer from "./appReducer";
import campaignReducer from "./campaignReducer";
import paymentReducer from "./paymentReducer";
import volunteerReducer from "./volunteerReducer";
import taskReducer from "./taskReducer";
import organizationReducer from "./organizationReducer";
const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2,
};

const authConfig = {
    ...commonConfig,
    key: "auth",
    whitelist: ["isLoggedIn", "token"],
};

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    app: appReducer,
    campaign: campaignReducer,
    user: userReducer,
    payment: paymentReducer,
    volunteer: volunteerReducer,
    task: taskReducer,
    organization: organizationReducer,
});

export default rootReducer;
