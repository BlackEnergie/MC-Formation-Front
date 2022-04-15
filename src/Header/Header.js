import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {

    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
    const navigate = useNavigate();

    const deconnect = () => {
        localStorage.clear();
        navigate('/connexion');
    }

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
                                accessToken ? (
                                    <div id="right-side-navbar">
                                        <button href="" className="boutonNavbar">
                                            <img src={require('../Img/parametres-des-engrenages.png')} alt="" className="Icones" />
                                            <Nav.Link href="#home" >Espace Admin</Nav.Link>
                                        </button>
                                    </div>
                                ) : (<div></div>)
                            }

                            {/*Partie Bouton Connexion / Déconnexion*/}
                            {
                                accessToken ? (
                                    <div id="right-side-navbar">
                                        <button onClick={deconnect} className="boutonNavbar">
                                            <img src={require('../Img/logout.png')} alt="" className="Icones" />
                                            <Nav.Link>Se Déconnecter</Nav.Link>
                                        </button>
                                    </div>

                                ) : (
                                    <div id="right-side-navbar">
                                        <button href="" className="boutonNavbar">
                                            <img src={require('../Img/login.png')} alt="IconeConnexion" className="Icones" />
                                            <Nav.Link>Connecter</Nav.Link>
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
