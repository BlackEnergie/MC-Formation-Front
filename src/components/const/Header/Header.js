import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css';
import {Link, useNavigate} from 'react-router-dom';
import {AiFillSetting} from 'react-icons/ai';
import {GiExitDoor} from 'react-icons/gi';
import {BsFillPersonFill} from 'react-icons/bs';
import jwtUtils from "../../../auth/decodeToken";

const Header = (props) => {

    const navigate = useNavigate();

    const checkAdminRole = () => {
        let res = false;
        const token = jwtUtils(localStorage.getItem("accessToken"));
        if (token !== null && token[0] && token[1].role === "ROLE_BN") {
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
                    <Link className="text-decoration-none d-flex" to="accueil">
                        <img src={require("../../../assets/img/logoblue_bgwht.png")} id='imageNavBar' alt='logoMCBlanc'/>
                        <Navbar.Brand id="navbarBrand">MC Formation</Navbar.Brand>
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
                                        <Link to="/admin">
                                            <button className="boutonNavbar">
                                                <AiFillSetting className="Icones"/>
                                                Espace Admin
                                            </button>
                                        </Link>
                                    </div>
                                ) : (<div></div>)
                            }

                            {/*Partie Bouton Connexion / Déconnexion*/}
                            {
                                props.login ? (
                                    <div id="right-side-navbar">
                                        <button onClick={deconnect} className="boutonNavbar">
                                            <GiExitDoor className="Icones"/>
                                            <Nav.Link>Se Déconnecter</Nav.Link>
                                        </button>
                                    </div>

                                ) : (
                                    <div id="right-side-navbar">
                                        <button href="" className="boutonNavbar">
                                            <BsFillPersonFill className="Icones"/>
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
