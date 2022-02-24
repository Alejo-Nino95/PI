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
            dato: "todos",
            temp: "todos",
            orden: "alfasc",
            paginas: 0,
            result: []
        }
    }

    componentDidMount() {
        this.props.getRazas();
        this.props.getTemperamentos();
        this.setState({
            result: this.props.razas,
        })
    }

    async handleChange(event) {
        if (this.state.dato === 'api' && this.state.temp === 'todos') {
            await this.setState({
                result: this.props.result.filter(r => r.id === 1)
            })
        }
        if (this.state.dato === 'bd' && this.state.temp === 'todos') {
            await this.setState({
                result: this.props.result.filter(r => r.id > 10)
            })
        }
        if (this.state.dato === 'todos' && this.state.temp === 'todos') {
            await this.setState({
                result: this.props.razas
            })
        }
        if (this.state.dato === 'api') {
            await this.setState({
                result: this.props.razas.filter(r => r.id === 1 && r.temperamento.includes(this.state.temp))
            })
        }
        if (this.state.dato === 'bd') {
            await this.setState({
                result: this.state.result.filter(r => r.id > 10 && r.temperamento.includes(this.state.temp))
            })
        }
        // if (this.state.dato === 'todos') {
        //     await this.setState({
        //         result: this.props.result.filter(r => r.temperamento.includes(this.state.temp))
        //     })
        // }
        this.setState({
            [event.target.name]: event.target.value,
        })
        this.setState({
            paginas: Math.trunc(this.state.result.length / 8 + 1)
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.getRazas(this.state.raza);
        this.setState({
            result: this.props.razas
        })
    }

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <input type="text" name="raza" placeholder="raza" onChange={e => this.handleChange(e)} />
                        <input type="submit" value='Buscar' />
                    </form>
                </div>
                <div>
                    <label>Filtrar por: Tipo de dato </label>
                    <select name="dato" onChange={e => this.handleChange(e)}>
                        <option value="todos">Todos</option>
                        <option value="api">Datos API</option>
                        <option value="bd">Datos BD</option>
                    </select>
                    <label> Temperamento </label>
                    <select name="temp" onChange={e => this.handleChange(e)}>
                        <option value="todos">Todos</option>
                        {this.props.temperamentos.map(t => {
                            return (
                                <option value={t.nombre}>{t.nombre}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <label>Ordenar por: </label>
                    <select name="orden" onChange={e => this.handleChange(e)}>
                        <option value="alfasc">Orden alfabético asc.</option>
                        <option value="alfdes">Orden alfabético des.</option>
                        <option value="pesasc">Peso ascendente</option>
                        <option value="pesdes">Peso descendente</option>
                    </select>
                </div>
                <div>
                    {this.state.result.map(r => {
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