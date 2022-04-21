import React, {useState} from 'react';
import MembreBureauNational from "../../../api/model/MembreBureauNational";
import SignupRequest from "../../../api/model/SignupRequest";
import axios from '../../../api/axios';
import toast from 'react-hot-toast';
import {useNavigate,useParams} from 'react-router-dom';
import {hashPassword} from "../../../utils/PasswordUtils";



const FormulaireInscriptionBN = () => {
    const [nomUtilisateur, setNomUtilisateur] = useState('');
    const [poste, setPoste] = useState('');
    const [mdp1, setMdp1] = useState('');
    const [mdp2, setMdp2] = useState('');
    const [mdp, setMdp] = useState('');
    const [hasUnfilled, setHasUnfilled] = useState({});
    const [options, setOptions] = useState([]);
    const [hasErrorAPI, setHasErrorAPI] = useState(false);
    const [loading, setLoading] = useState(false);

    const {token} =useParams();
    const navigate = useNavigate();

    const INSCRIPTION_URL = '/auth/signup/create?token='

    const handleSubmit = async () => {
        let membreBureauNational = mapFormToMembreBureauNational();
        try {
            const response = await axios.post(INSCRIPTION_URL + token,
                JSON.stringify(membreBureauNational),
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

    const mapFormToMembreBureauNational = () => {
        let membreBureauNational = new MembreBureauNational()
        membreBureauNational.poste = poste;
        let signup = new SignupRequest()
        signup.nomUtilisateur = nomUtilisateur;
        signup.password = hashPassword(mdp);
        signup.membreBureauNational = membreBureauNational;
        return signup;
    }


    const resetForm = () => {
        setNomUtilisateur('');
        setPoste('');
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
        if (!poste) {
            isValid = false;
            hasUnfilled["nom"] = "Renseigner votre nom.";
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
        loading ? <div>Loading...</div> : hasErrorAPI ? <div>Error occured while fetching data.</div> :
            <div className="FormulaireInscription">
                <div className="row justify-content-md-center  mt-3">
                    <div className="col col-lg-5 border border-dark">
                        <h1 className="justify-content-center align-items-center">
                            <u>INSCRIPTION A LA PLATEFORME</u>
                        </h1>
                    </div>
                </div>
                <div className="row justify-content-md-center mt-3">
                    <div className="col col-lg-5 ">
                        <form>
                            <div className="form-group">
                                <label htmlFor="nomUtilisateur" className="mt-2 mb-2">Choisissez un nom d'utilisateur</label>
                                <input
                                    type="text"
                                    name="nomUtilisateur"
                                    value={nomUtilisateur}
                                    onChange={event => setNomUtilisateur(event.target.value)}
                                    className="form-control mt-2"
                                    id="email"/>
                                <div className="text-danger">{hasUnfilled.nomUtilisateur}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="poste" className="mt-2 mb-2">Indiquez votre poste</label>
                                <input
                                    type="text"
                                    name="poste"
                                    value={poste}
                                    onChange={event => setPoste(event.target.value)}
                                    className="form-control mt-2"
                                    id="email"/>
                                <div className="text-danger">{hasUnfilled.nom}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="mdp1" className="mt-2">Choisissez un mot de passe</label>
                                <input
                                    type="password"
                                    name="mdp1"
                                    value={mdp1}
                                    onChange={event => {
                                        setMdp(event.target.value);
                                        setMdp1(event.target.value)
                                    }}
                                    className="form-control mt-2"
                                    id="email"/>
                                <div className="text-danger">{hasUnfilled.mdp1}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="mdp2" className="mt-2">Confirmez le mot de passe</label>
                                <input
                                    type="password"
                                    name="mdp2"
                                    value={mdp2}
                                    onChange={event => setMdp2(event.target.value)}
                                    className="form-control mt-2"
                                    id="email"/>
                                <div className="text-danger">{hasUnfilled.mdp2}</div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <div className="p-2">
                                    <input type="button" value="Valider" className="btn btn-primary" onClick={clic}/>
                                </div>
                                <div className="p-2">
                                    <input type="button" value="Reset" className="btn btn-primary" onClick={resetForm}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    );
}


export default FormulaireInscriptionBN;
