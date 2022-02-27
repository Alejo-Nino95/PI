import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Card(props) {

  return (
    <div>
      <img src={props.imagen} alt='Hola'/>
      <div>
        <NavLink to={`/detail/${props.nombre}`}>{props.nombre}</NavLink>
      </div>
      <div>
        <h6>Temperamento</h6>
        <p>{props.temperamento}</p>
      </div>
      <div>
        <h6>Peso</h6>
        <p>{props.peso}</p>
      </div>
    </div>
  )
}