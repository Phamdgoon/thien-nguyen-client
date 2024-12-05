import actionTypes from "../actions/actionTypes";

const initState = {
    taskTypes: [],
    msg: "",
};

const taskReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_TASK_TYPES:
            return {
                ...state,
                taskTypes: action.taskTypes || [],
                msg: action.msg || "",
            };
        default:
            return state;
    }
};

export default taskReducer;
