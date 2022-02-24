import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom"
import { getTemperamentos, postNuevaRaza } from "../actions";

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
            imagen: "",
            temperamentos: []
        }
    }

    componentDidMount() {
        this.props.getTemperamentos();
    }

    handleChange(event) {
        if (event.target.type === 'checkbox') {
            if (event.target.checked) this.state.temperamentos.push(event.target.value)
            else this.setState({ temperamentos: this.state.temperamentos.filter(t => t !== event.target.value) })
        } else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        if(!this.state.nombre.length) alert('Debe tener nombre')
        else if (/[^A-Za-z ]/i.test(this.state.nombre)) alert('El nombre solo debe contener carácteres alfabéticos')
        else if (this.state.altmin < 1) alert('La altura mínima debe ser mayor a 0cm')
        else if (this.state.altmax > 110) alert('La altura máxima no puede sobrepasar 110cm')
        else if (this.state.altmax < this.state.altmin) alert('La altura máxima debe ser mayor a la altura mínima')
        else if (this.state.pesomin < 1) alert('El peso mínimo debe ser mayor a 0kg')
        else if (this.state.pesomax > 85) alert('El peso máximo no puede sobrepasar 85kg')
        else if (this.state.pesomax < this.state.pesomin) alert('El peso máximo debe ser mayor al peso mínimo')
        else if (this.state.anosvida < 1 || this.state.anosvida > 13) alert('Los años de vida debe ser un valor entre 1 y 13 años')
        else if (!this.state.temperamentos.length) alert('Debe tener temperamentos')
        else {
            let obj = {
                imagen: this.state.imagen,
                nombre: this.state.nombre,
                altura: this.state.altmin + ' - ' + this.state.altmax,
                peso: this.state.pesomin + ' - ' + this.state.pesomax,
                anosvida: this.state.anosvida,
                temperamentos: this.state.temperamentos
            }
            this.props.postNuevaRaza(obj)
            alert('Registro existoso')
        }
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
                    <p>Imagen (url)</p>
                    <input type="url" name="imagen" placeholder="url" onChange={e => this.handleChange(e)} />
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
        temperamentos: state.temperamentos,
        alert: state.alert
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getTemperamentos: temperamentos => dispatch(getTemperamentos()),
        postNuevaRaza: raza => dispatch(postNuevaRaza(raza))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form_Creation);