import React, {useState} from 'react';
import Association from "../../../api/model/Association";
import {hashPassword} from "../../../utils/PasswordUtils";
import toast from "react-hot-toast";
import SignupRequest from "../../../api/model/SignupRequest";
import {useNavigate, useParams} from 'react-router-dom';
import { PostSignUpWithRole } from '../../../serverInteraction/PostSignUp';


const FormulaireInscriptionAsso = () => {
    const [nomUtilisateur, setNomUtilisateur] = useState('');
    const [acronyme, setAcronyme] = useState('');
    const [nomComplet, setNomComplet] = useState('');
    const [ville, setVille] = useState('');
    const [college, setCollege] = useState('A');
    const [mdp1, setMdp1] = useState('');
    const [mdp2, setMdp2] = useState('');
    const [mdp, setMdp] = useState('');
    const [hasUnfilled, setHasUnfilled] = useState({nomUtilisateur : "", acronyme: "", nomComplet: "", ville: "", college: "", mdp1: "", mdp2: ""});
    const [select, setSelect] = useState('er');

    const {token} = useParams();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        let association = mapFormToAssociation();
        try {
            const response = await PostSignUpWithRole( token, association);
            toast.success(response.data.message);
            navigate('/')
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    //(le token retourne rôle + mail)
    const mapFormToAssociation = () => {
        let association = new Association()
        let signup = new SignupRequest()
        signup.nomUtilisateur = nomUtilisateur.trim();
        signup.password = hashPassword(mdp);
        association.acronyme = acronyme.trim();
        association.college = college.trim();
        association.nomComplet = nomComplet.trim();
        association.ville = ville.trim();
        signup.association = association;
        return signup;
    }

    const resetForm = () => {
        setNomUtilisateur('');
        setAcronyme('');
        setNomComplet('');
        setHasUnfilled({nomUtilisateur : "", acronyme: "", nomComplet: "", ville: "", college: "", mdp1: "", mdp2: ""});
        setVille('');
        setCollege('');
        setMdp1('');
        setMdp2('');
        setSelect("er")

    }

    const validate = () => {

        let hasUnfilled = {nomUtilisateur : "", acronyme: "", nomComplet: "", ville: "", college: "", mdp1: "", mdp2: ""};
        let isValid = true;

        if (!nomUtilisateur) {
            isValid = false;
            hasUnfilled["nomUtilisateur"] = "Renseigner un nom d'utilisateur.";
        }
        if (!acronyme) {
            isValid = false;
            hasUnfilled["acronyme"] = "Renseigner l'acronyme.";
        }
        if (!nomComplet) {
            isValid = false;
            hasUnfilled["nomComplet"] = "Renseigner le nom complet.";
        }
        if (!ville) {
            isValid = false;
            hasUnfilled["ville"] = "Renseigner la ville.";
        }
        if (!college) {
            isValid = false;
            hasUnfilled["college"] = "Renseigner le collège.";
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
                        Inscription en tant qu'association
                    </h3>
                    <hr/>
                </div>
            </div>
            <div className="row justify-content-md-center">
                <div className="col col-lg-5">
                    <form>
                        <div className="form-group mb-3">
                            <label htmlFor="nomUtilisateur" className="form-label">Nom d'utilisateur</label>
                            <input
                                type="text"
                                name="nomUtilisateur"
                                value={nomUtilisateur}
                                onChange={event => setNomUtilisateur(event.target.value)}
                                className="form-control"
                                id="email"
                                required={true}/>
                            <div className="text-danger">{hasUnfilled.nomUtilisateur}</div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="acronyme" className="form-label">Indiquez l'acronyme de votre
                                association</label>
                            <input
                                type="text"
                                name="acronyme"
                                value={acronyme}
                                onChange={event => setAcronyme(event.target.value)}
                                className="form-control"
                                placeholder="Ex : JMC Bordeaux"
                                required={true}
                                id="email"/>
                            <div className="text-danger">{hasUnfilled.acronyme}</div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="nomComplet" className="form-label">Indiquez le nom complet de votre
                                association</label>
                            <input
                                type="text"
                                name="nomComplet"
                                value={nomComplet}
                                onChange={event => setNomComplet(event.target.value)}
                                className="form-control"
                                placeholder="Ex : Junior MIAGE Concept Bordeaux"
                                required={true}
                                id="email"/>
                            <div className="text-danger">{hasUnfilled.nomComplet}</div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="college" className="form-label">Indiquez le college dont dépend votre
                                association</label>
                            <select className='form-select' aria-label="Default select example" value={select}
                                    onChange={(e) => {
                                        setCollege(e.target.value);
                                        setSelect(e.target.value);
                                    }}>
                                <option value="A">Collège A</option>
                                <option value="B">Collège B</option>
                                <option value="C">Collège C</option>
                            </select>
                            <div className="text-danger">{hasUnfilled.college}</div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="ville" className="form-label">Indiquez la ville de votre association</label>
                            <input
                                type="text"
                                name="ville"
                                value={ville}
                                onChange={event => setVille(event.target.value)}
                                className="form-control"
                                placeholder="Ex : Bordeaux"
                                required={true}
                                id="email"/>
                            <div className="text-danger">{hasUnfilled.ville}</div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="mdp1" className="form-label">Choisissez un mot de passe</label>
                            <input
                                type="password"
                                name="mdp1"
                                value={mdp1}
                                onChange={event => {
                                    setMdp(event.target.value);
                                    setMdp1(event.target.value)
                                }}
                                className="form-control"
                                required={true}
                                id="email"/>
                            <div className="text-danger">{hasUnfilled.mdp1}</div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="mdp2" className="form-label">Confirmez le mot de passe</label>
                            <input
                                type="password"
                                name="mdp2"
                                value={mdp2}
                                onChange={event => setMdp2(event.target.value)}
                                className="form-control"
                                required={true}
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


export default FormulaireInscriptionAsso;
