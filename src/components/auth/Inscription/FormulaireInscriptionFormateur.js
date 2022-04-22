import React, {useState} from 'react';
import Formateur from "../../../api/model/Formateur";
import {hashPassword} from "../../../utils/PasswordUtils";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../../api/axios";
import toast from "react-hot-toast";
import SignupRequest from "../../../api/model/SignupRequest";

// MANQUE DOMAINES

const FormulaireInscriptionFormateur = () => {
    const [nomUtilisateur, setNomUtilisateur] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [mdp1, setMdp1] = useState('');
    const [mdp2, setMdp2] = useState('');
    const [mdp, setMdp] = useState('');
    const [hasUnfilled, setHasUnfilled] = useState({});

    const INSCRIPTION_URL = '/auth/signup/create?token='
    const {token} = useParams();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        let association = mapFormToFormateur();
        try {
            const response = await axios.post(INSCRIPTION_URL + token,
                JSON.stringify(association),
                {
                    headers: {'Content-Type': 'application/json'}
                }
            );
            toast.success(response.data.message);
            navigate('/')
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    //(le token retourne rôle + mail)
    const mapFormToFormateur = () => {
        let formateur = new Formateur()
        let signup = new SignupRequest()
        signup.nomUtilisateur = nomUtilisateur;
        signup.password = hashPassword(mdp);
        formateur.nom = nom;
        formateur.prenom = prenom;
        signup.formateur = formateur;
        return signup;
    }

    const resetForm = () => {
        setNomUtilisateur('');
        setNom('');
        setPrenom('');
        setHasUnfilled({});
        setMdp1('');
        setMdp2('');
    }

    const validate = () => {

        let hasUnfilled = {};
        let isValid = true;

        if (!nomUtilisateur) {
            isValid = false;
            hasUnfilled["nomUtilisateur"] = "Renseigner un nom d'utilisateur.";
        }
        if (!nom) {
            isValid = false;
            hasUnfilled["nom"] = "Renseigner votre nom.";
        }
        if (!prenom) {
            isValid = false;
            hasUnfilled["prenom"] = "Renseigner votre prénom.";
        }
        if (!mdp1) {
            isValid = false;
            hasUnfilled["mdp1"] = "Renseigner un mot de passe.";
        }
        if (mdp1 !== mdp2)
            isValid = false;
        hasUnfilled["mdp2"] = "Les mots de passe ne correspondent pas.";
        if (isValid) {
            handleSubmit();
        } else {
            setHasUnfilled(hasUnfilled);
        }
    }

    const clic = () => {
        if (mdp1 !== mdp2) {
            validate();
        } else if (mdp1 == "" && mdp2 == "") {
            validate();
        } else {
            validate();
        }

    }
    return (
            <div className="FormulaireInscription">
                <div className="row justify-content-md-center">
                    <div className="col col-lg-5">
                        <h3 className="color-mc">
                            Inscription en tant que formateur
                        </h3>
                        <hr/>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col col-lg-5 ">
                        <form>
                            <div className="form-group mb-3">
                                <label htmlFor="nomUtilisateur" className="form-label">Choisissez un nom
                                    d'utilisateur</label>
                                <input
                                    type="text"
                                    name="nomUtilisateur"
                                    value={nomUtilisateur}
                                    onChange={event => setNomUtilisateur(event.target.value)}
                                    className="form-control"
                                    required={true}
                                    id="email"/>
                                <div className="text-danger">{hasUnfilled.nomUtilisateur}</div>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="nom" className="form-label">Indiquez votre nom</label>
                                <input
                                    type="text"
                                    name="nom"
                                    value={nom}
                                    onChange={event => setNom(event.target.value)}
                                    className="form-control"
                                    required={true}
                                    id="email"/>
                                <div className="text-danger">{hasUnfilled.nom}</div>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="prenom" className="form-label">Indiquez votre prénom</label>
                                <input
                                    type="text"
                                    name="prenom"
                                    value={prenom}
                                    onChange={event => setPrenom(event.target.value)}
                                    className="form-control"
                                    required={true}
                                    id="email"/>
                                <div className="text-danger">{hasUnfilled.prenom}</div>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="mdp1" className="form-label">Choisissez un mot de passe</label>
                                <input
                                    type="password"
                                    name="mdp1"
                                    value={mdp1}
                                    required={true}
                                    onChange={event => {
                                        setMdp(event.target.value);
                                        setMdp1(event.target.value)
                                    }}
                                    className="form-control"
                                    id="email"/>
                                <div className="text-danger">{hasUnfilled.mdp1}</div>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="mdp2" className="form-label">Confirmez le mot de passe</label>
                                <input
                                    type="password"
                                    name="mdp2"
                                    value={mdp2}
                                    required={true}
                                    onChange={event => setMdp2(event.target.value)}
                                    className="form-control"
                                    id="email"/>
                                <div className="text-danger">{hasUnfilled.mdp2}</div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <div className="p-2">
                                    <button type="button" className="btn btn-mc" onClick={clic}>
                                        Valider
                                    </button>
                                </div>
                                <div className="p-2">
                                    <button type="button" className="btn btn-mc" onClick={resetForm}>
                                        Effacer
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    );
}


export default FormulaireInscriptionFormateur;
