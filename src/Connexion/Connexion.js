import './Connexion.css';

import GoogleLogin from 'react-google-login';
import React, {Component, useState } from 'react';

import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


/*const database = [{username: "test@gmail.com",password: "pass1"},{username: "user2",password: "pass2"}];*/


class Connexion extends Component {

    constructor() {
        super();
        this.state = {
            input: {},
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };


    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.setState({
            input
        });
    };


    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.input.Email)
        console.log(this.state.input.Mdp)
        if (this.state.input.Email == "test1@gmail.com")
            console.log("test ici")

    }


    render() {
        return (
            <body>
            <div className="div-Connexion">
                <img src={require("../Img/logoblue_bgwht.png")} id="logo_connexion" alt="logo-mc"/>
                <h1 id="titreConnexion">Connectez-vous à l'espace <br/> Formation de MIAGE Connection</h1>

                <form id="Form-Connexion">
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            onChange={this.handleChange}
                            value={this.state.input.Email}
                            name="Email"/>
                        <div className="text-danger">{this.state.errors.Email}</div>
                    </div>
                    <div className="form-group mt-3 mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Mot de passe"
                            onChange={this.handleChange}
                            value={this.state.input.Mdp}
                            name="Mdp"
                        />
                        <div class="text-danger">{this.state.errors.Mdp}</div>
                    </div>
                    <input type="button" className="form-group btn btn-primary" onClick={this.handleSubmit} value="Se Connecter"/>
                </form>

                <div id="contactVP">
                    <a href="">Entrer en contact avec VP Formation</a>
                </div>
            </div>
            </body>
        );
    }
}

export default Connexion;