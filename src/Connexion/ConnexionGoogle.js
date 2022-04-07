import './Connexion.css';
import Header from './Header'
import Footer from './Footer'

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

    return (
        <html>
        <Header/>

        <body>
            <div className="div-Connexion">
                <img src={require("../Img/profilblue.png")} id ="logo_connexion" alt="logo-mc" />
                <h1 id="titreConnexion">Connectez-vous à l'espace <br/> Formation de MIAGE Connection</h1>
                <div id="boutonGoogle">
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
                    <a id ="contactVP" href="">Entrer en contact avec VP Formation</a>
                </div>
            </div>
        </body>

        <Footer/>

        </html>
    );
}

export default Connexion;
