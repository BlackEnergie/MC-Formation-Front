import './Connexion.css';
import React, {useState} from 'react';
import Utilisateur from "../../../api/model/Utilisateur";
import axios from '../../../api/axios';
import {useOutletContext} from 'react-router-dom';
import {hashPassword} from "../../../utils/PasswordUtils";

const LOGIN_URL = '/auth/signin';

const Connexion = () => {

    const [login, setLogin] = useOutletContext();

    const [nomUtilisateur, setNomUtilisateur] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const mapFormToUtilisateur = () => {
        let utilisateur = new Utilisateur();
        utilisateur.nomUtilisateur = nomUtilisateur;
        utilisateur.password = hashPassword(pwd);
        return utilisateur;
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        const utilisateur = mapFormToUtilisateur();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify(utilisateur),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: false,
                }
            );
            const accessToken = response?.data?.accessToken;
            localStorage.setItem("accessToken", accessToken);
            setLogin(true);
            window.location.href = '/';
        } catch (err) {
            if (!err?.response) {
                setErrMsg('no server response');
            } else if (err.response?.status === 400) {
                setErrMsg('missing nom utilisateur ou mot de passe');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login failed.');
            }
            setNomUtilisateur('');
            setPwd('');
        }
    }

    return (
        <>
            <div className="div-Connexion">
                <img src={require("../../../assets/img/logoblue_bgwht.png")} id="logo_connexion" alt="logo-mc"/>
                <h1 id="titreConnexion">Connectez-vous à l'espace <br/> Formation de MIAGE Connection</h1>
                <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <form id="Form-Connexion" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            id="nomUtilisateur"
                            type="text"
                            value={nomUtilisateur}
                            className="form-control"
                            placeholder="Nom d'utilisateur"
                            onChange={(e) => setNomUtilisateur(e.target.value)}
                            name="nomUtilisateur"/>

                    </div>
                    <div className="form-group mt-3 mb-3">
                        <input
                            id="mdp"
                            type="password"
                            value={pwd}
                            className="form-control"
                            placeholder="Mot de passe"
                            onChange={(e) => setPwd(e.target.value)}
                            name="mdp"
                        />
                    </div>
                    <input type="submit" className="form-group btn btn-mc" value="Se Connecter"
                           alt="buttonConnexion"/>
                </form>
                <div id="contactVP">
                    <a href="/">Entrer en contact avec VP Formation</a>
                </div>
            </div>
        </>
    );
}

export default Connexion;
