import React, { Component } from "react";
import { connect } from "react-redux";
import { getRazas } from "../actions";

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
                {this.props.razas.map(r => {
                    return (
                        <h1>{r.nombre}</h1>
                    )
                })}
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