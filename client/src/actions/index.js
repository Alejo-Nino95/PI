import axios from 'axios'

export function getRazas(raza) {
    return async function (dispatch) {
        try {
            let razas;
            if (raza) { razas = await axios.get(`http://localhost:3001/dogs?name=${raza}`) }
            else { razas = await axios.get('http://localhost:3001/dogs') }
            dispatch({ type: "GET_RAZAS", payload: razas.data })
        }
        catch {
            dispatch({ type: "GET_RAZAS", payload: 'Error' })
        }
    };
};

export function getTemperamentos() {
    return async function (dispatch) {
        const temperamentos = await axios.get('http://localhost:3001/temperament')
        dispatch({ type: "GET_TEMP", payload: temperamentos.data });
    };
};

export function postNuevaRaza(raza) {
    return async function (dispatch) {
        const nuevaRaza = await axios.post('http://localhost:3001/dog', {
            imagen: raza.imagen,
            nombre: raza.nombre,
            altura: raza.altura,
            peso: raza.peso,
            anosvida: raza.anosvida,
            temperamentos: raza.temperamentos
        })
        dispatch({ type: "POST_RAZA", payload: nuevaRaza.data });
    };
};

export function filterTemp(temp) {
    return function (dispatch) {
        dispatch({ type: "FILTER_TEMP", payload: temp })
    };
};

export function filterDato(dato) {
    return function (dispatch) {
        dispatch({ type: "FILTER_DATO", payload: dato })
    };
};

export function orderAlf(alf) {
    return function (dispatch) {
        dispatch({ type: "ORDER_ALF", payload: alf })
    };
};

export function orderPesomin(peso) {
    return function (dispatch) {
        dispatch({ type: "ORDER_PMIN", payload: peso })
    };
};

export function orderPesomax(peso) {
    return function (dispatch) {
        dispatch({ type: "ORDER_PMAX", payload: peso })
    };
};

export function buscarRaza(raza) {
    return async function (dispatch) {
        const result = await axios.get(`http://localhost:3001/dogs/${raza}`)
        dispatch({ type: "GET_RESRAZ", payload: result.data });
    };
};