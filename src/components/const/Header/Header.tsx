import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css';
import {Link, useNavigate} from 'react-router-dom';
import {AiFillSetting} from 'react-icons/ai';
import jwtUtils from '../../../auth/decodeToken';
import {FiLogOut} from 'react-icons/fi';
import {IoIosAddCircleOutline} from 'react-icons/io';

const Header = (props) => {

    const navigate = useNavigate();

    const checkAdminRole = () => {
        let res = false;
        const token = jwtUtils(localStorage.getItem('accessToken')).decoded;
        if (token !== null && token.role === 'ROLE_BN') {
            res = true;
        }
        return res;
    }

    const checkAssoRole = () => {
        let res = false;
        const token = jwtUtils(localStorage.getItem('accessToken')).decoded;
        if (token !== null && token.role === 'ROLE_ASSO') {
            res = true;
        }
        return res;
    }

    const deconnect = () => {
        localStorage.clear();
        props.setLogin(false);
        navigate('/connexion');
    }

    return (
        <header>
            <Navbar id="header-connexion" expand="lg">
                <Nav className="ml-auto">
                    <Link className="text-decoration-none d-flex" to="/">
                        <img src={require('../../../assets/img/logoblue_bgwht.png')} id="imageNavBar"
                             alt="logoMCBlanc"/>
                        <Navbar.Brand className="navbar-brand">MIAGE Connection - Formation</Navbar.Brand>
                    </Link>
                </Nav>
                <Nav className="mr-auto">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/*Partie Bouton Espace Admin*/}
                            {
                                props.login && checkAdminRole() ? (
                                    <div id="right-side-navbar">
                                        <Nav.Link>
                                            <Link to="admin">
                                                <button className="btn btn-outline-mc">
                                                    <AiFillSetting className="Icones"/>
                                                    Espace Admin
                                                </button>
                                            </Link>
                                        </Nav.Link>
                                    </div>
                                ) : (<></>)
                            }

                            {/*Partie Bouton Espace Asso*/}
                            {
                                props.login && checkAssoRole() ? (
                                    <div id="right-side-navbar">
                                        <Nav.Link>
                                            <Link to="/demandeFormation">
                                                <button className="btn btn-outline-mc">
                                                    <IoIosAddCircleOutline className="Icones"/>
                                                    Demander une formation
                                                </button>
                                            </Link>
                                        </Nav.Link>
                                    </div>
                                ) : (<></>)
                            }

                            {/*Partie Bouton Connexion / Déconnexion*/}
                            {
                                props.login ? (
                                    <div id="right-side-navbar">
                                        <Nav.Link>
                                            <button title="Déconnexion" onClick={deconnect}
                                                    className="btn btn-outline-mc">
                                                <FiLogOut className="Icones"/>
                                            </button>
                                        </Nav.Link>
                                    </div>
                                ) : (
                                    <></>
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
