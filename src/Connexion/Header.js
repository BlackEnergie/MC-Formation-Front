import GoogleLogin from 'react-google-login';
import { useState } from 'react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import './Header.css';


let loginData = "test";
let loginAdmin = "test";


function Header (){
    return(
        <header>
            <Navbar id="header-connexion"  expand="lg">
                <Nav className="ml-auto">
                    <img src={require('../Img/logoblue_bgwht.png')} id='imageNavBar' alt='logoMCBlanc'/>
                    <Navbar.Brand id="navbarBrand" href="#home">MC Formation</Navbar.Brand>
                </Nav>

                <Nav className="mr-auto">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav className="me-auto">
                            {/*Partie Bouton Espace Admin*/}
                            {
                                loginAdmin ? (
                                    <div id="right-side-navbar">
                                        <button onClick="" href="" className="boutonNavbar">
                                            <img src={require('../Img/parametres-des-engrenages.png')} alt="" className="Icones" />
                                            <Nav.Link href="#home" >Espace Admin</Nav.Link>
                                        </button>
                                    </div>
                                ) : (<div></div>)
                            }

                            {/*Partie Bouton Connexion / Déconnexion*/}
                            {
                                loginData ? (
                                    <div id="right-side-navbar">
                                        <button onClick="" href="" className="boutonNavbar">
                                            <img src={require('../Img/logout.png')} alt="" className="Icones" />
                                            <Nav.Link href="#home" >Se Déconnecter</Nav.Link>
                                        </button>
                                    </div>

                                ) : (
                                    <div id="right-side-navbar">
                                        <button onClick="" href="" className="boutonNavbar">
                                            <img src={require('../Img/login.png')} alt="" className="Icones" />
                                            <Nav.Link href="#home" >Connecter</Nav.Link>
                                        </button>
                                    </div>

                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Nav>
            </Navbar>
        </header>
    )
}
export default Header;