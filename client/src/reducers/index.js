const initialState = {
    razas: [],
    getRazas: [],
    temperamentos: [],
    razaBus: {}
};

function rootReducer(state = initialState, action) {
    if (action.type === "GET_RAZAS") {
        if (typeof(action.payload) !== 'string') {
            action.payload.forEach(e => {
                if (e.id >= 1000) {
                    let temp = []
                    e.Temperamentos.forEach(t => {
                        temp.push(t.nombre)
                    })
                    e.temperamento = temp.join(', ')
                }
            })
        }
        return {
            ...state,
            razas: action.payload,
            getRazas: action.payload
        }
    }
    if (action.type === "GET_TEMP") {
        const temp = action.payload.sort((a, b) => {
            if (a.nombre < b.nombre) return -1
            if (a.nombre === b.nombre) return 0
            return 1
        })
        return {
            ...state,
            temperamentos: temp
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
        if (action.payload === 'asca') {
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
    if (action.type === "ORDER_PMIN") {
        let orden;
        state.razas.forEach(r => {
            if (r.peso.length > 2) {
                if (r.peso[0] === 'N') r.pesoCom = 1000
                else if (r.peso[2] === '-') r.pesoCom = parseInt(r.peso[0])
                else r.pesoCom = parseInt(r.peso[0].concat(r.peso[1]))
            } else {
                r.pesoCom = parseInt(r.peso)
            }
        });
        if (action.payload === 'ascpmn') {
            orden = state.razas.sort((a, b) => {
                return a.pesoCom - b.pesoCom;
            })
        }
        else {
            orden = state.razas.sort((a, b) => {
                return b.pesoCom - a.pesoCom;
            })
        }
        return {
            ...state,
            razas: orden
        }
    }
    if (action.type === "ORDER_PMAX") {
        let orden;
        state.razas.forEach(r => {
            if (r.peso.length > 2) {
                if (r.peso === 'NaN') r.pesoCom = 1000
                else if (r.peso[r.peso.length - 3] === '-') r.pesoCom = parseInt(r.peso[r.peso.length - 1])
                else r.pesoCom = parseInt(r.peso[r.peso.length - 2].concat(r.peso[r.peso.length - 1]))
            } else {
                r.pesoCom = parseInt(r.peso)
            }
        });
        if (action.payload === 'ascpmx') {
            orden = state.razas.sort((a, b) => {
                return a.pesoCom - b.pesoCom;
            })
        }
        else {
            orden = state.razas.sort((a, b) => {
                return b.pesoCom - a.pesoCom;
            })
        }
        return {
            ...state,
            razas: orden
        }
    }
    if (action.type === "GET_RESRAZ") {
        let res = [];
        if (action.payload.id >= 1000) {
            let temp = []
            action.payload.Temperamentos.forEach(t => {
                temp.push(t.nombre)
            })
            action.payload.temperamento = temp.join(', ')
            res.push(action.payload)
        } else {
            res = action.payload
        }
        return {
            ...state,
            razaBus: res
        }
    }
    return state;
}

export default rootReducer;