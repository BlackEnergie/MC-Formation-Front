import './Connexion.css';
import GoogleLogin from 'react-google-login';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


function Connexion() {
    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData')
            ? JSON.parse(localStorage.getItem('loginData'))
            : null
    );

    //result vient de l'api avec l'erreur
    const handleFailure = (result) => {
        alert(result);
    };

    // googleData vient de l'api avec les informations de l'utilisateur
    const handleLogin = async (googleData) => {
        console.log(googleData)
        const res = await fetch('/api/google-login', {
            method: 'POST',
            body: JSON.stringify({
                token: googleData.tokenId,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();
        setLoginData(data);
        localStorage.setItem('loginData', JSON.stringify(data));
    };

    //supprimer les infos si l'utilisateur de déco
    const handleLogout = () => {
        localStorage.removeItem('loginData');
        setLoginData(null);
    };

    const testEnv = () => {
        console.log("JE SUIS ICI");
        console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
    }

    return (
        <>
        <Navbar id="header-connexion"  expand="lg">
            <Container>
                <Navbar.Brand href="#home">MC Formation</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <div className="div-Connexion">
            <header className="Connexion-main">
                <img src={require("../Img/profilblue.png")} alt="logo-mc" />
                <h1 id="titreConnexion">Connectez-vous à l'espace <br/> Formation de MIAGE Connection</h1>
                <div id="boutonGoogle">

                    {testEnv()}
                    {
                        loginData ? (
                        <div>
                            <h3>Vous êtes connectés avec {loginData.email}</h3>
                            <button onClick={handleLogout}>Se déconnecter</button>
                        </div>
                    ) : (

                        <GoogleLogin

                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText="Log in with Google"
                            onSuccess={handleLogin}
                            onFailure={handleFailure}
                            cookiePolicy={'single_host_origin'}
                        > Continuer avec Google</GoogleLogin>
                    )}
                </div>

                <div>
                    <a href="">Entrer en contact avec VP Formation</a>
                </div>
            </header>
        </div>
        </>
    );
}

export default Connexion;