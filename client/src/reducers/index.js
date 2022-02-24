const initialState = {
    razas: [],
    temperamentos: [],
    alert: ""
};

function rootReducer(state = initialState, action) {
    if (action.type === "GET_RAZAS") {
        return {
            ...state,
            razas: action.payload,
        }
    }
    if (action.type === "GET_TEMP") {
        return {
            ...state,
            temperamentos: action.payload
        }
    }
    if (action.type === "POST_RAZA") {
        return {
            ...state,
            alert: action.payload
        }
    }
    return state;
}

export default rootReducer;