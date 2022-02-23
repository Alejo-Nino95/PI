import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Card(props) {
  // acá va tu código
  return( 
  <div>
    <img src={props.imagen}/>
    <div>
      <NavLink to={`/home/${props.nombre}`}>{props.nombre}</NavLink>
    </div>
    <div>
      <h6>Temperamento</h6>
      <p>{props.temperamento}</p>
    </div>
    <div>
      <h6>Altura</h6>
      <p>{props.peso}</p>
    </div>
    <div>
      <h6>Peso</h6>
      <p>{props.peso}</p>
    </div>
    <div>
      <h6>Años de Vida</h6>
      <p>{props.peso}</p>
    </div>
  </div>
  )
};