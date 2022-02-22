import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom"
import { getRazas } from "../actions";
import Card from "./Card";

class Home extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     imagen: "",
        //     nombre: "",
        //     temperamento: "",
        //     peso: ""
        // }
    }

    componentDidMount() {
        this.props.getRazas();
    }

    // handleSubmit(event) {
    //     event.preventDefault();
    //     this.props.razas = this.props.getRazas();
    // }

    render() {
        return (
            <div>
                <div>
                    <form>
                        <input type="text" placeholder="raza"/>
                        <input type="submit" />
                    </form>
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
                    <NavLink to='/home'>Volver a cargar razas</NavLink>
                    <NavLink to='/razanueva'>Crear raza</NavLink>
                    <NavLink to='/'>Volver</NavLink>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        razas: state.razas
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getRazas: raza => dispatch(getRazas()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);