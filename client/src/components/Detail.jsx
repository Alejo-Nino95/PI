import React from 'react';
import { useState, useEffect } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { getRazas, buscarRaza } from '../actions';

export default function Detail() {
  const razaBus = useSelector(state => state.razaBus);
  const razas = useSelector(state => state.razas);

  const dispatch = useDispatch();
  const location = useLocation();

  const [res, setRes] = useState([])

  useEffect(() => {
    dispatch(getRazas());
  }, [dispatch])

  setRes(res)

  var indexini = location.pathname.indexOf('l') + 2;
  var indexfini = location.pathname.length;
  var raza = '';
  for (let i = indexini; i < indexfini; i++) {
    raza += location.pathname[i]
  }

  raza = raza.replace('%20',' ')

  const result = razas.find(r => r.nombre === raza)

  console.log(res)

  dispatch(buscarRaza(result.id))

  console.log(razaBus[0].nombre)

  return (
    <div>
      <p>{razaBus[0].nombre}</p>
      {/* <img src={props.imagen} />
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
      </div> */}
    </div>
  )
};