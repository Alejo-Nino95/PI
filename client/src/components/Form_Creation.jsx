import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom"
import { getTemperamentos } from "../actions";

class Form_Creation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            altmin: "",
            altmax: "",
            pesomin: "",
            pesomax: "",
            anosvida: "",
            temperamentos: []
        }
    }

    componentDidMount() {
        this.props.getTemperamentos();
    }

    handleChange(event) {
        if (event.target.type === 'checkbox') {
            if(event.target.checked) this.state.temperamentos.push(event.target.value)
            else this.state.temperamentos = this.state.temperamentos.filter(t=> t!==event.target.value)
        } else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log(this.state.temperamentos)
    }

    render() {
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <p>Nombre</p>
                    <input type="text" name="nombre" placeholder="nombre" onChange={e => this.handleChange(e)} />
                    <p>Altura</p>
                    Min <input type="number" name="altmin" placeholder="altura mínima" onChange={e => this.handleChange(e)} /> Max <input type="number" name="altmax" placeholder="altura máxima" onChange={e => this.handleChange(e)} />
                    <p>Peso</p>
                    Min <input type="number" name="pesomin" placeholder="peso mínimo" onChange={e => this.handleChange(e)} /> Max <input type="number" name="pesomax" placeholder="peso máxima" onChange={e => this.handleChange(e)} />
                    <p>Años de vida</p>
                    <input type="number" name="anosvida" placeholder="años" onChange={e => this.handleChange(e)} />
                    <p>Temperamentos</p>
                    {this.props.temperamentos.map(t => {
                        return (
                            <div>
                                <input type="checkbox" value={t.nombre} onChange={e => this.handleChange(e)} />{t.nombre}<br />
                            </div>
                        )
                    })}
                    <input type="submit" />
                    <NavLink to='/home'>Volver</NavLink>
                </form>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        temperamentos: state.temperamentos
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getTemperamentos: temperamentos => dispatch(getTemperamentos()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form_Creation);