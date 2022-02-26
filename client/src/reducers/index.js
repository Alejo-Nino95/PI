const initialState = {
    razas: [],
    getRazas: [],
    temperamentos: [],
    alert: "",
    razaBus: {}
};

function rootReducer(state = initialState, action) {
    if (action.type === "GET_RAZAS") {
        return {
            ...state,
            razas: action.payload,
            getRazas: action.payload
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
    if (action.type === "FILTER_TEMP") {
        let filter = state.getRazas.filter(r => r.temperamento)
        filter = filter.filter(r => r.temperamento.includes(action.payload))
        return {
            ...state,
            razas: filter
        }
    }
    if (action.type === "FILTER_DATO") {
        let filter;
        if (action.payload === 'api') filter = state.getRazas.filter(r => r.id < 1000)
        else filter = state.getRazas.filter(r => r.id >= 1000)
        return {
            ...state,
            razas: filter
        }
    }
    if (action.type === "ORDER_ALF") {
        let orden;
        if (action.payload === 'asc') {
            orden = state.razas.sort((a, b) => {
                if (a.nombre < b.nombre) return -1;
                if (a.nombre === b.nombre) return 0;
                return 1;
            })
        }
        else {
            orden = state.razas.sort((a, b) => {
                if (a.nombre < b.nombre) return 1;
                if (a.nombre === b.nombre) return 0;
                return -1;
            })
        }
        return {
            ...state,
            razas: orden
        }
    }
    if (action.type === "GET_RESRAZ") {
        return {
            ...state,
            razaBus: action.payload
        }
    }
    return state;
}

export default rootReducer;