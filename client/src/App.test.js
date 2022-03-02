import { render, screen } from '@testing-library/react';
import App from './App';
import { filterTemp } from "../src/actions";
import rootReducer from './reducers';
import { getRazas, getTemperamentos } from './actions'

describe("Reducers", () => {

  let estadoInicial;

  beforeEach(() => {
    estadoInicial = {
      razas: [],
      getRazas: [],
      temperamentos: [],
      razaBus: {}
    }
  });

  describe("Actions", () => {
    it('Retorna el estado inicial', () => {
      const actual = rootReducer(estadoInicial, {});
      const esperado = estadoInicial;

      expect(actual).toEqual(esperado);
    });
  })
})
