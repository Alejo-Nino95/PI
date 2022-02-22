const initialState = {
    razas: []
};

function rootReducer(state = initialState, action) {
    if (action.type === "GET_RAZAS") {
        return {
            ...state,
            razas: state.razas.concat(action.payload)
        }
    }
    return state;
}

export default rootReducer;