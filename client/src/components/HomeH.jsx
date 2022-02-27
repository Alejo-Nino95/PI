import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { filterDato, filterTemp, getRazas, getTemperamentos, orderAlf } from "../actions";
import Card from "./Card";

export default function HomeH() {
    var razas = useSelector(state => state.razas);
    const temperamentos = useSelector(state => state.temperamentos);
    const [raza, setRaza] = useState("");
    const [orden, setOrden] = useState("");

    const dispatch = useDispatch();
    const location = useLocation();

    var indexini = location.pathname.indexOf('e') + 2;
    var indexfini = location.pathname.length - 1;
    var index;
    if (indexini === indexfini) index = parseInt(location.pathname[indexini]);
    else index = parseInt(location.pathname[indexini].concat(location.pathname[indexfini]))

    useEffect(() => {
        dispatch(getRazas(raza));
        dispatch(getTemperamentos());
    }, [dispatch, raza])

    useEffect(() => {
    },[orden])

    const handleChange = function (event) {
        if (event.target.name === "raza") setRaza(event.target.value)
        else if (event.target.name === "dato") {
            if (event.target.value === 'todos') dispatch(getRazas(raza))
            else dispatch(filterDato(event.target.value))
        }
        else if (event.target.name === "temp") {
            if (event.target.value === 'todos') dispatch(getRazas(raza))
            else dispatch(filterTemp(event.target.value))
        }
        else if (event.target.name === "ordenalf") {
            dispatch(orderAlf(event.target.value));
            setOrden(event.target.value);
        }
        // dispatch(filterTemp(event.target.value))
        // console.log(temp)
        // if (temp !== "todos") {
        //     var r = result.filter(r => r.temperamento)
        //     setResult(r.filter(r => r.temperamento.includes(temp)))
        // }
    }



    const filter = function (event) {
        // if (event.target.value !== "todos") {
        //     setResult(result.filter(r => r.temperamento))
        // }
    }


    // if (temp !== "todos") {
    //     var r = result.filter(r => r.temperamento)
    //     setResult(r.filter(r => r.temperamento.includes(temp)))
    // }

    // if (orden === 'alfasc') {
    //     razas.sort()
    // }

    // if (orden === 'alfdes') {
    //     razas.sort(function (a, b) {
    //         if (a.nombre < b.nombre) return 1;
    //         if (a.nombre === b.nombre) return 0;
    //         return -1
    //     })
    // }

    var paginas = []
    for (let i = 1; i < Math.trunc(razas.length / 8 + 2); i++) {
        paginas.push(i)
    }

    // while(temp !== 'todos') {
    //     result = result.filter(r => r.temperamento)
    //     result = result.filter(r => r.temperamento.includes(temp))
    // }

    // var resPag = []
    // for (let i = (page*8)-8; i < page*8; i++) {
    //     resPag[i] = result[i]
    // }

    // setRePag(resPag);

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
                <label>Ordenar por: Orden alfabético </label>
                <select name="ordenalf" onChange={e => handleChange(e)}>
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendente</option>
                </select>
                <label> Peso </label>
                <select name="ordenpes" onChange={e => handleChange(e)}>
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendente</option>
                </select>
            </div>
            <div>
                {(typeof (razas) === 'string') ? (<p>No existe raza con nombre {raza}</p>) : (razas.slice((index * 8) - 8, index * 8).map(r => {
                    return (
                        <Card
                            nombre={r.nombre}
                            temperamento={r.temperamento}
                            peso={r.peso}
                            imagen={r.imagen}
                        />
                    )
                }))}
            </div>
            <div>
                {paginas.map(p => {
                    return (
                        <NavLink to={`/home/${p}`}>{p}</NavLink>
                    )
                }
                )}
            </div>
            <div>
                <button>Volver a cargar razas</button>
                <NavLink to='/razanueva'>Crear raza</NavLink>
                <NavLink to='/'>Volver</NavLink>
            </div>
        </div>
    )

}