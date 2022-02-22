import axios from 'axios'

export function getRazas() {
    return async function (dispatch) {
        const razas = await axios.get('http://localhost:3001/dogs')
        dispatch({ type: "GET_RAZAS", payload: razas.data });
    };
};
