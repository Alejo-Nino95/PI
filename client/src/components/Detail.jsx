import React from 'react';
import { useEffect } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { buscarRaza } from '../actions';

export default function Detail() {
  const razaBus = useSelector(state => state.razaBus);
  const razas = useSelector(state => state.razas);

  const dispatch = useDispatch();
  const location = useLocation();

  const buscar = () => {
    let indexini = location.pathname.indexOf('l') + 2;
    let indexfini = location.pathname.length;
    let raza = '';
    for (let i = indexini; i < indexfini; i++) {
      raza += location.pathname[i]
    }

    raza = raza.replace('%20', ' ')
    const razaBuscada = razas.find(r => r.nombre === raza)
    dispatch(buscarRaza(razaBuscada.id))
  }

  useEffect(() => {
    buscar();

  }, [])

  return (
    <div>
      {(!razaBus.length) ? (<p>Cargando datos...</p>) : (razaBus.map(r => {
        return (
          <div>
            <img src={r.imagen} alt="" />
            <div>
              <h6>Nombre</h6>
              <p>{r.nombre}</p>
            </div>
            <div>
              <h6>Temperamento</h6>
              <p>{r.temperamento}</p>
            </div>
            <div>
              <h6>Altura</h6>
              <p>{r.altura}</p>
            </div>
            <div>
              <h6>Peso</h6>
              <p>{r.peso}</p>
            </div>
            <div>
              <h6>Años de vida</h6>
              <p>{r.anosvida}</p>
            </div>
          </div>
        )

      }))}
      <NavLink to='/home/1'>Volver</NavLink>
    </div>
  )
}
