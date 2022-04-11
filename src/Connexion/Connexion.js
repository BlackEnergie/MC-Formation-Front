import './Connexion.css';
import React, {Component, useState} from 'react';
import Utilisateur from "../api/model/Utilisateur";
import Api from "../api/Api";
import { instanceOf } from 'prop-types';
import { withCookies, token, useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Connexion = () => {

    let api = new Api();
    
    const [email, setEmail] = useState('');    
    const [pwd, setPwd] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useCookies(['token']);

    const mapFormToUtilisateur = () => {
        let utilisateur = new Utilisateur();
        utilisateur.nomUtilisateur = email;
        utilisateur.password = pwd;
        return utilisateur;
    }
    
    const handleSubmit = () => {

        let utilisateur = mapFormToUtilisateur();
        api.postAuthentification(utilisateur).then(data =>{
            if(!data.error){
                console.log(token['token']['accessToken']);
                setToken(token['token']['accessToken']);
                console.log('Connexion');
                //useNavigate("/accueilformations");
            }
            else{
                setError("Mauvais identifiant et mot de passe.");
            }
        }).catch(e=>{
            console.log(e);
        })

    }

    return (
        <>
        <div className="div-Connexion">
            <img src={require("../Img/logoblue_bgwht.png")} id="logo_connexion" alt="logo-mc"/>
            <h1 id="titreConnexion">Connectez-vous à l'espace <br/> Formation de MIAGE Connection</h1>
            <form id="Form-Connexion">
                <div className="form-group">
                    <input
                        id="email"
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={event => setEmail(event.target.value)}
                        name="email"/>
                    
                </div>
                <div className="form-group mt-3 mb-3">
                    <input
                        id="mdp"
                        type="password"
                        className="form-control"
                        placeholder="Mot de passe"
                        onChange={event => setPwd(event.target.value)}
                        name="mdp"
                    />
                </div>
                <div>{error}</div>
                <input type="button" className="form-group btn btn-primary" onClick={handleSubmit} value="Se Connecter" alt="buttonConnexion"/>
            </form>
            <div id="contactVP">
                <a href="/">Entrer en contact avec VP Formation</a>
            </div>
            </div>
        </>
    );
}

export default withCookies(Connexion);
