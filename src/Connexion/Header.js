import { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

const cookies = new Cookies();

class Header extends Component{

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
    constructor(props){
        super(props);
        this.state={
            token: cookies.get('token') || ''
        }
    }
    removeCookie(){
        
        cookies.remove("token");
        document.location.reload();
    }
    render(){
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
                                    cookies.get("token") && cookies.get("token").roles[0]==="ROLE_BN" ? (
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
                                    cookies.get('token') ? (
                                        <div id="right-side-navbar">
                                            <button onClick={this.removeCookie} className="boutonNavbar">
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
   
}
export default withCookies(Header);
