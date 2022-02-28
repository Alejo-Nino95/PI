import './Landing_Page.css'
import React from "react";
import { NavLink } from "react-router-dom"

export default function Landing_Page() {
    return (
        <div className='pagina'>
            <h1>Henry Dogs</h1>
            <p>En esta página encontraras la información más importante de tus razas favoritas <br />
                Bienvenido / Bienvenida
            </p>
            <label > Ingrese aquí -----{'>'} </label>
            <NavLink to='/home/1' className="unselected">Entrar</NavLink>
        </div>
    )
}
