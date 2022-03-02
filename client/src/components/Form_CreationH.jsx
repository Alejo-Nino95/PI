import './Form_CreationH.css'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import { getTemperamentos, postNuevaRaza } from "../actions";

export default function Form_Creation() {
    const temperamentos = useSelector(state => state.temperamentos);

    const dispatch = useDispatch();

    const [nombre, setNombre] = useState("")
    const [altmin, setAltmin] = useState("")
    const [altmax, setAltmax] = useState("")
    const [pesomin, setPesomin] = useState("")
    const [pesomax, setPesomax] = useState("")
    const [anosvida, setAnosvida] = useState("")
    const [imagen, setImagen] = useState("")
    const [temp, setTemp] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        dispatch(getTemperamentos())
    }, [dispatch, error])

    const handleChange = (event) => {
        if (event.target.type === 'checkbox') {
            if (event.target.checked) temp.push(event.target.value)
            else setTemp(temp.filter(t => t !== event.target.value))
        } else {
            if (event.target.name === 'nombre') {
                if (/[^A-Za-z ]/i.test(event.target.value)) {
                    setError('El nombre solo debe contener carácteres alfabéticos')
                } else {
                    setError('')
                }
                setNombre(event.target.value)
            }
            else if (event.target.name === 'altmin') {
                if (parseInt(event.target.value) < 1) {
                    setError('La altura mínima debe ser mayor a 0cm')
                } else {
                    setError('')
                }
                setAltmin(event.target.value)
            }
            else if (event.target.name === 'altmax') {
                if ((parseInt(event.target.value) > 110) || (parseInt(event.target.value) < parseInt(altmin))) {
                    setError('La altura máxima no puede sobrepasar 110cm ó la altura máxima debe ser mayor a la altura mínima')
                } else {
                    setError('')
                }
                setAltmax(event.target.value)
            }
            else if (event.target.name === 'pesomin') {
                if (parseInt(event.target.value) < 1) {
                    setError('El peso mínimo debe ser mayor a 0kg')
                } else {
                    setError('')
                }
                setPesomin(event.target.value)
            }
            else if (event.target.name === 'pesomax') {
                if ((parseInt(event.target.value) > 85) || (parseInt(event.target.value) < pesomin)) {
                    setError('El peso máximo no puede sobrepasar 85kg ó el peso máximo debe ser mayor al peso mínimo')
                } else {
                    setError('')
                }
                setPesomax(event.target.value)
            }
            else if (event.target.name === 'anosvida') {
                if ((parseInt(event.target.value) < 1) || (parseInt(event.target.value) > 13)) {
                    setError('Los años de vida debe ser un valor entre 1 y 13 años')
                } else {
                    setError('')
                }
                setAnosvida(event.target.value)
            }
            else if (event.target.name === 'imagen') setImagen(event.target.value)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!nombre.length) alert('Debe tener nombre')
        else if (!altmin.length) alert('Debe tener altura mínima')
        else if (!altmax.length) alert('Debe tener altura máxima')
        else if (!pesomin.length) alert('Debe tener peso mínimo')
        else if (!pesomax.length) alert('Debe tener peso máximo')
        else if (!temp.length) alert('Debe tener temperamentos')
        else {
            let n = nombre[0].toUpperCase();
            for (let i = 1; i < nombre.length; i++) {
                n += nombre[i].toLowerCase();
            }
            let obj = {
                imagen: imagen,
                nombre: n,
                altura: altmin + ' - ' + altmax,
                peso: pesomin + ' - ' + pesomax,
                anosvida: anosvida,
                temperamentos: temp
            }
            dispatch(postNuevaRaza(obj))
            dispatch(getTemperamentos())
            alert('Registro existoso')
            document.location.reload();
        }
    }

    return (
        <div className="form">
            <h1>Nueva Raza</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <p>{(error === '') ? (null) : (error)}</p>
                <label>Nombre </label>
                <input className='inptext1' type="text" name="nombre" placeholder="nombre" onChange={e => handleChange(e)} />
                <p>Altura (cm)</p>
                Min <input className='inpnum' type="number" name="altmin" placeholder="#" onChange={e => handleChange(e)} /> Max <input className='inpnum' type="number" name="altmax" placeholder="#" onChange={e => handleChange(e)} />
                <p>Peso (kg)</p>
                Min <input className='inpnum' type="number" name="pesomin" placeholder="#" onChange={e => handleChange(e)} /> Max <input className='inpnum' type="number" name="pesomax" placeholder="#" onChange={e => handleChange(e)} />
                <br /> <br /> <label>Años de vida </label>
                <input className='inpnum' type="number" name="anosvida" placeholder="#" onChange={e => handleChange(e)} />
                <br /> <br /> <label>Imagen (url) </label>
                <input className='inptext2' type="url" name="imagen" placeholder="url" onChange={e => handleChange(e)} />
                <p>Temperamentos</p>
                <div className='temp'>
                    {temperamentos.map(t => {
                        return (
                            <div>
                                <input className='tempu' type="checkbox" value={t.nombre} onChange={e => handleChange(e)} />{t.nombre}<br />
                            </div>
                        )
                    })}
                </div>
                <div className='foot'>
                    <input type="submit" />
                    <NavLink to='/home/1' className='linkfooter'>Volver</NavLink>
                </div>
            </form>
        </div >
    )
}