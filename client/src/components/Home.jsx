import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom"
import { getRazas, getTemperamentos } from "../actions";
import Card from "./Card";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            raza: "",
            pages: []
        }
    }

    componentDidMount() {
        this.props.getRazas();
        this.props.getTemperamentos();
        this.setState({
            pages: Math.trunc(this.props.razas.length/8+1)
        })
    }

    handleChange(event) {
        this.setState({
            raza: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.getRazas(this.state.raza);
        this.paginacion()
    }

    paginacion(){
        let pages = [];
        for (let i = 0; i < Math.trunc(this.props.razas.length/8+1); i++) {
            pages.push(i+1)
        }
        this.setState({
            pages: pages
        })
    }

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <input type="text" placeholder="raza" onChange={e => this.handleChange(e)}/>
                        <input type="submit" value='Buscar'/>
                    </form>
                </div>
                <div>
                    <label>Filtrar por: Tipo de dato </label>
                    <select name="" id="">
                        <option value="todos">Todos</option>
                        <option value="api">Datos API</option>
                        <option value="bd">Datos BD</option>
                    </select>
                    <label> Temperamento </label>
                    <select name="" id="">
                        <option value="todos">Todos</option>
                        {this.props.temperamentos.map(t => {
                            return(
                                <option value={t.nombre}>{t.nombre}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <label>Ordenar por: </label>
                    <select name="" id="">
                        <option value="alfasc">Orden alfabético asc.</option>
                        <option value="alfdes">Orden alfabético des.</option>
                        <option value="pesasc">Peso ascendente</option>
                        <option value="pesdes">Peso descendente</option>
                    </select>
                </div>
                <div>
                    {this.props.razas.map(r => {
                        return (
                            <Card
                                nombre={r.nombre}
                                temperamento={r.temperamento}
                                peso={r.peso}
                                imagen={r.imagen}
                            />
                        )
                    })}
                </div>
                <div>
                    <button>Volver a cargar razas</button>
                    <NavLink to='/razanueva'>Crear raza</NavLink>
                    <NavLink to='/'>Volver</NavLink>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        razas: state.razas,
        temperamentos: state.temperamentos
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getRazas: raza => dispatch(getRazas(raza)),
        getTemperamentos: temperamento => dispatch(getTemperamentos())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);