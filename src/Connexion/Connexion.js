import './Connexion.css';
import GoogleLogin from 'react-google-login';
import { useState } from 'react';

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
        <div className="Connexion">
            <header className="Connexion-header">
                <h1 id="titreConnexion">Connectez-vous à l'espace <br/> Formation de MIAGE Connection</h1>
                <div>

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
            </header>
        </div>
    );
}

export default Connexion;