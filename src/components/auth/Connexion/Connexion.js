import './Connexion.css';
import React, {useState} from 'react';
import Utilisateur from "../../../api/model/Utilisateur";
import {Link, useOutletContext} from 'react-router-dom';
import {hashPassword} from "../../../utils/PasswordUtils";
import {toast} from "react-hot-toast";
import { PostConnexion } from '../../../serverInteraction/PostConnexion';
import useAxiosPrivate from '../../../auth/hooks/useAxiosPrivate';
import { Link as LinkMui } from '@mui/material';

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

    const axiosPrivate = useAxiosPrivate()
    
    const handleSubmit = async (e) => {

        e.preventDefault();
        const utilisateur = mapFormToUtilisateur();
        try {
            const response = await PostConnexion(axiosPrivate, utilisateur)
            const accessToken = response?.data?.accessToken;
            localStorage.setItem("accessToken", accessToken);
            setLogin(true);
            window.location.href = '/';
            toast.success("Connecté en tant que '" + nomUtilisateur + "'");
        } catch (err) {
            let errMsg = 'La connexion a échoué';
            if (!err?.response) {
                errMsg = 'Pas de réponse du serveur';
            } else if (err.response?.status === 400) {
                errMsg = "Nom d'utilisateur ou mot de passe manquant";
            } else if (err.response?.status === 401) {
                errMsg = "Nom d'utilisateur ou mot de passe incorrect";
            }
            toast.error(errMsg);
            setPwd('');
        }
    }

    return (
        <>
            <div className="div-Connexion">
                <img src={require("../../../assets/img/logoblue_bgwht.png")} id="logo_connexion" alt="logo-mc"/>
                <h1 id="titreConnexion">Connectez-vous à l'espace <br/> Formation de MIAGE Connection</h1>
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
                    <Link to="/motDePasseOublie">
                        <LinkMui color="primary">Mot de passe oublié ?</LinkMui>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Connexion;
