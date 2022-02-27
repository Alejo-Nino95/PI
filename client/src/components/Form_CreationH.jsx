import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import { postNuevaRaza } from "../actions";

export default function Form_Creation () {
    const temperamentos = useSelector(state => state.temperamentos);

    const dispatch = useDispatch();

    const [nombre,setNombre] = useState("")
    const [altmin,setAltmin] = useState("")
    const [altmax,setAltmax] = useState("")
    const [pesomin,setPesomin] = useState("")
    const [pesomax,setPesomax] = useState("")
    const [anosvida,setAnosvida] = useState("")
    const [imagen,setImagen] = useState("")
    const [temp, setTemp] = useState([])

    const handleChange = (event) => {
        if (event.target.type === 'checkbox') {
            if (event.target.checked) temp.push(event.target.value)
            else setTemp(temp.filter(t => t !== event.target.value))
        } else {
            if(event.target.name === 'nombre') setNombre(event.target.value)
            else if(event.target.name === 'altmin') setAltmin(event.target.value)
            else if(event.target.name === 'altmax') setAltmax(event.target.value)
            else if(event.target.name === 'pesomin') setPesomin(event.target.value)
            else if(event.target.name === 'pesomax') setPesomax(event.target.value)
            else if(event.target.name === 'anosvida') setAnosvida(event.target.value)
            else if(event.target.name === 'imagen') setImagen(event.target.value)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(!nombre.length) alert('Debe tener nombre')
        else if (/[^A-Za-z ]/i.test(nombre)) alert('El nombre solo debe contener carácteres alfabéticos')
        else if (altmin < 1) alert('La altura mínima debe ser mayor a 0cm')
        else if (altmax > 110) alert('La altura máxima no puede sobrepasar 110cm')
        else if (altmax < altmin) alert('La altura máxima debe ser mayor a la altura mínima')
        else if (pesomin < 1) alert('El peso mínimo debe ser mayor a 0kg')
        else if (pesomax > 85) alert('El peso máximo no puede sobrepasar 85kg')
        else if (pesomax < pesomin) alert('El peso máximo debe ser mayor al peso mínimo')
        else if (anosvida < 1 || anosvida > 13) alert('Los años de vida debe ser un valor entre 1 y 13 años')
        else if (!temp.length) alert('Debe tener temperamentos')
        else {
            let obj = {
                imagen: imagen,
                nombre: nombre,
                altura: altmin + ' - ' + altmax,
                peso: pesomin + ' - ' + pesomax,
                anosvida: anosvida,
                temperamentos: temp
            }
            dispatch(postNuevaRaza(obj))
            alert('Registro existoso')
        }
    }

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <p>Nombre</p>
                <input type="text" name="nombre" placeholder="nombre" onChange={e => handleChange(e)} />
                <p>Altura</p>
                Min <input type="number" name="altmin" placeholder="altura mínima" onChange={e => handleChange(e)} /> Max <input type="number" name="altmax" placeholder="altura máxima" onChange={e => handleChange(e)} />
                <p>Peso</p>
                Min <input type="number" name="pesomin" placeholder="peso mínimo" onChange={e => handleChange(e)} /> Max <input type="number" name="pesomax" placeholder="peso máxima" onChange={e => handleChange(e)} />
                <p>Años de vida</p>
                <input type="number" name="anosvida" placeholder="años" onChange={e => handleChange(e)} />
                <p>Imagen (url)</p>
                <input type="url" name="imagen" placeholder="url" onChange={e =>handleChange(e)} />
                <p>Temperamentos</p>
                {temperamentos.map(t => {
                    return (
                        <div>
                            <input type="checkbox" value={t.nombre} onChange={e => handleChange(e)} />{t.nombre}<br />
                        </div>
                    )
                })}
                <input type="submit" />
                <NavLink to='/home/1'>Volver</NavLink>
            </form>
        </div >
    )
}