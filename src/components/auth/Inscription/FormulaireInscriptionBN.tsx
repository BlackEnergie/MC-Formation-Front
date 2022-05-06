import React, {useState} from 'react';
import MembreBureauNational from "../../../api/model/MembreBureauNational";
import SignupRequest from "../../../api/model/SignupRequest";
import toast from 'react-hot-toast';
import {useNavigate,useParams} from 'react-router-dom';
import {hashPassword} from "../../../utils/PasswordUtils";
import { PostSignUpWithRole } from '../../../serverInteraction/PostSignUp';



const FormulaireInscriptionBN = () => {
    const [nomUtilisateur, setNomUtilisateur] = useState('');
    const [poste, setPoste] = useState('');
    const [mdp1, setMdp1] = useState('');
    const [mdp2, setMdp2] = useState('');
    const [mdp, setMdp] = useState('');
    const [hasUnfilled, setHasUnfilled] = useState({nom:"",nomUtilisateur:"",mdp1:"",mdp2:""});

    const {token} =useParams();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        let membreBureauNational = mapFormToMembreBureauNational();
        try {
            const response = await PostSignUpWithRole( token, membreBureauNational);
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
        setHasUnfilled({nom:"",nomUtilisateur:"",mdp1:"",mdp2:""});
        setMdp1('');
        setMdp2('');
    }

    const validate = () => {

        let hasUnfilled = {nom:"",nomUtilisateur:"",mdp1:"",mdp2:""};
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
            <div className="FormulaireInscription">
                <div className="row justify-content-md-center">
                    <div className="col col-lg-5">
                        <h3 className="color-mc">
                            Inscription en tant que membre du bureau national
                        </h3>
                        <hr/>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col col-lg-5 ">
                        <form>
                            <div className="form-group mb-3">
                                <label htmlFor="nomUtilisateur" className="form-label">Choisissez un nom d'utilisateur</label>
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
                                <label htmlFor="poste" className="form-label">Indiquez votre poste</label>
                                <input
                                    type="text"
                                    name="poste"
                                    value={poste}
                                    onChange={event => setPoste(event.target.value)}
                                    className="form-control"
                                    placeholder="VP Formations"
                                    required={true}
                                    id="email"/>
                                <div className="text-danger">{hasUnfilled.nom}</div>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="mdp1" className="form-label">Choisissez un mot de passe</label>
                                <input
                                    type="password"
                                    name="mdp1"
                                    required={true}
                                    value={mdp1}
                                    onChange={event => {
                                        setMdp(event.target.value);
                                        setMdp1(event.target.value)
                                    }}
                                    className="form-control "
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
                                    className="form-control "
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


export default FormulaireInscriptionBN;
