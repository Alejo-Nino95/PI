const initialState = {
    razas: [],
    temperamentos: []
};

function rootReducer(state = initialState, action) {
    if (action.type === "GET_RAZAS") {
        return {
            ...state,
            razas: state.razas.concat(action.payload)
        }
    }
    if (action.type === "GET_TEMP") {
        return {
            ...state,
            temperamentos: state.temperamentos.concat(action.payload)
        }
    }
    return state;
}

export default rootReducer;