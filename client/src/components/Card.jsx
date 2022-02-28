import './Card.css'
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Card(props) {

  return (
    <div className='card'>
      <img src={props.imagen} alt='Img not found' />
      <div>
        <NavLink to={`/detail/${props.nombre}`} className='nombre'>{props.nombre}</NavLink>
      </div>
      <div>
        <h3>Temperamento</h3>
        <p>{props.temperamento}</p>
      </div>
      <div>
        <h3>Peso (kg)</h3>
        <p>{props.peso}</p>
      </div>
    </div>
  )
}