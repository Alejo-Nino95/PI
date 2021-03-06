import './HomeH.css'
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { filterDato, filterTemp, getRazas, getTemperamentos, orderAlf, orderPesomax, orderPesomin } from "../actions";
import Card from "./Card";

export default function HomeH() {
    var razas = useSelector(state => state.razas);
    const temperamentos = useSelector(state => state.temperamentos);
    const [raza, setRaza] = useState("");
    const [buscar, setBuscar] = useState("");
    const [filtro, setFiltro] = useState("")
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
    }, [filtro, orden])

    const handleChange = function (event) {
        if (event.target.name === "raza") setBuscar(event.target.value)
        else if (event.target.name === "dato") {
            if (event.target.value === 'todos') {
                dispatch(getRazas(raza))
                setFiltro(event.target.value)
            }
            else {
                dispatch(filterDato(event.target.value))
                setFiltro(event.target.value)
            }
        }
        else if (event.target.name === "temp") {
            if (event.target.value === 'todos') {
                dispatch(getRazas(raza))
                setFiltro(event.target.value)
            }
            else {
                dispatch(filterTemp(event.target.value))
                setFiltro(event.target.value)
            }
        }
        else if (event.target.name === "ordenalf") {
            if (event.target.value !== 'sin') {
                if ((orden !== "ascpmn") && (orden !== "despmn") && (orden !== "ascpmx") && (orden !== "despmx")) {
                    dispatch(orderAlf(event.target.value));
                    setOrden(event.target.value);
                }
            } else {
                setOrden(event.target.value);
            }
        }
        else if (event.target.name === "ordenpesmin") {
            if (event.target.value !== 'sin') {
                if ((orden !== "asca") && (orden !== "desa") && (orden !== "ascpmx") && (orden !== "despmx")) {
                    dispatch(orderPesomin(event.target.value));
                    setOrden(event.target.value);
                }
            } else {
                setOrden(event.target.value);
            }
        }
        else if (event.target.name === "ordenpesmax") {
            if (event.target.value !== 'sin') {
                if ((orden !== "asca") && (orden !== "desa") && (orden !== "ascpmn") && (orden !== "despmn")) {
                    dispatch(orderPesomax(event.target.value));
                    setOrden(event.target.value);
                }
            } else {
                setOrden(event.target.value);
            }
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        setRaza(buscar);
        setTimeout(() => {
            setBuscar('')
        }, 1000)
    }

    var paginas = []
    for (let i = 1; i < Math.trunc(razas.length / 8 + 2); i++) {
        paginas.push(i)
    }

    return (
        <div>
            <div className='busqueda'>
                <form onSubmit={e => handleSubmit(e)}>
                    <input className='inpbus' type="text" name="raza" placeholder="raza" onChange={e => handleChange(e)} value={buscar} />
                    <input className='btnbus' type="Submit" value='Buscar' />
                </form>
            </div>
            <div className='filord'>
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
                <label> (Seleccione uno)</label>
            </div>
            <div className='filord'>
                <label>Ordenar por: Orden alfab??tico </label>
                <select name="ordenalf" onChange={e => handleChange(e)}>
                    <option value="sin">Sin orden</option>
                    <option value="asca">Ascendente</option>
                    <option value="desa">Descendente</option>
                </select>
                <label> Peso min </label>
                <select name="ordenpesmin" onChange={e => handleChange(e)}>
                    <option value="sin">Sin orden</option>
                    <option value="ascpmn">Ascendente</option>
                    <option value="despmn">Descendente</option>
                </select>
                <label> Peso max </label>
                <select name="ordenpesmax" onChange={e => handleChange(e)}>
                    <option value="sin">Sin orden</option>
                    <option value="ascpmx">Ascendente</option>
                    <option value="despmx">Descendente</option>
                </select>
                <label> (Seleccione uno, poner en "sin orden" los dem??s)</label>
            </div>
            <div className='cards'>
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
            <div className='paginado'>
                {paginas.map(p => {
                    return (
                        <NavLink to={`/home/${p}`} className='link'>{p}</NavLink>
                    )
                }
                )}
            </div>
            <div className='footer'>
                <button onClick={() => {
                    dispatch(getRazas())
                    setRaza('')
                }}>Volver a cargar razas</button>
                <NavLink to='/razanueva' className='linkfooter'>Crear raza</NavLink>
                <NavLink to='/' className='linkfooter'>Volver</NavLink>
            </div>
        </div>
    )

}