import axios from 'axios'

export function getRazas(raza) {
    return async function (dispatch) {
        let razas;
        if(raza) {razas = await axios.get(`http://localhost:3001/dogs?name=${raza}`)}
        else {razas = await axios.get('http://localhost:3001/dogs')}
        dispatch({ type: "GET_RAZAS", payload: razas.data });
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
