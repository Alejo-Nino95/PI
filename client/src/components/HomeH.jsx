import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getRazas, getTemperamentos } from "../actions";
import Card from "./Card";

export default function HomeH() {
    var razas = useSelector(state => state.razas)
    const temperamentos = useSelector(state => state.temperamentos)
    const [raza, setRaza] = useState("");
    const [dato, setDato] = useState("todos");
    const [temp, setTemp] = useState("todos");
    const [orden, setOrden] = useState("alfasc");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRazas());
        dispatch(getTemperamentos())
    }, [dispatch])

    const handleChange = async function (event) {
        if (event.target.name === "raza") {
            setRaza(event.target.value)
            dispatch(getRazas(raza))
        }
        else if (event.target.name === "dato") setDato(event.target.value)
        else if (event.target.name === "temp") setTemp(event.target.value)
        else if (event.target.name === "orden") setOrden(event.target.value)
    }

    if (temp !== "todos") {
        razas = razas.filter(r => r.temperamento)
        razas = razas.filter(r => r.temperamento.includes(temp))
        console.log(razas)
    }

    if (orden === 'alfasc') {
        razas.sort()
    }

    if (orden === 'alfdes') {
        razas.sort(function (a, b) {
            if (a.nombre < b.nombre) return 1;
            if (a.nombre === b.nombre) return 0;
            return -1
        })
    }


    // if (orden === 'pesasc') {
    //     razas = razas.filter(r => r.peso === 'NaN')
    //     // razas = razas.filter(r => parseInt(r.peso.substring(0,1)) === 'number')
    //     console.log(razas)
    //     // razas.sort(function (a,b){
    //     //     return parseInt(a.peso.substring(0,1))-parseInt(b.peso.substring(0,1))
    //     // })
    // }


    return (
        <div>
            <div>
                <input type="text" name="raza" placeholder="raza" onChange={e => handleChange(e)} />
            </div>
            <div>
                <label>Filtrar por: Tipo de dato </label>
                <select name="dato" onChange={e => handleChange(e)}>
                    <option value="todos">Todos</option>
                    <option value="api">Datos API</option>
                    <option value="bd">Datos BD</option>
                </select>
                <label> Temperamento </label>
                <select name="temp" onChange={e => handleChange(e)}>
                    <option value="todos">Todos</option>
                    {temperamentos.map(t => {
                        return (
                            <option value={t.nombre}>{t.nombre}</option>
                        )
                    })}
                </select>
            </div>
            <div>
                <label>Ordenar por: </label>
                <select name="orden" onChange={e => handleChange(e)}>
                    <option value="alfasc">Orden alfabético asc.</option>
                    <option value="alfdes">Orden alfabético des.</option>
                    <option value="pesasc">Peso ascendente</option>
                    <option value="pesdes">Peso descendente</option>
                </select>
            </div>
            <div>
                {razas.map(r => {
                    return (
                        <Card
                            nombre={r.nombre}
                            temperamento={r.temperamento}
                            peso={r.peso}
                            imagen={r.imagen}
                        />
                    )
                })}
            </div>
            <div>
                <button>Volver a cargar razas</button>
                <NavLink to='/razanueva'>Crear raza</NavLink>
                <NavLink to='/'>Volver</NavLink>
            </div>
        </div>
    )

}