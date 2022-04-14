import React, {useEffect} from 'react';
import Association from "../api/model/Association";
import Utilisateur from "../api/model/Utilisateur";
import { useState } from 'react';
import Api from '../api/Api';
import Select from 'react-select';
import { withCookies, Cookies } from 'react-cookie';


const cookies = new Cookies();
const FormulaireInscription = () => {
    const [acronyme, setAcronyme] = useState('');
    const [nomComplet, setNomComplet] = useState('');
    const [ville, setVille] = useState('');
    const [college, setCollege] = useState('');
    const [mdp1, setMdp1] = useState('');
    const [mdp2, setMdp2] = useState('');
    const [mdp, setMdp] = useState('');
    const [hasUnfilled, setHasUnfilled] = useState({});
    const [options, setOptions] = useState([]);
    const [hasErrorAPI, setHasErrorAPI] =  useState(false);
    const [loading, setLoading] =  useState(false);




    const handleSubmit = () => {
        let association = mapFormToAssociation();
        let api = new Api();
        console.log(JSON.stringify(association))
        api.postInscription(association,cookies.get("token").accessToken)
        .then(() => { 
            resetForm()
        })
        .catch(function(err) {  
            setHasErrorAPI(true);
            console.log(err);
        });
    }

    //(le token retourne rôle + mail)
    const mapFormToAssociation = () => {
        let association = new Association("test@nauetzrçcdeieazpzc.ccoyem", mdp, "testUsecr", acronyme, college, nomComplet, ville)
        console.log(association);
        return association;
    }


    const resetForm = () => {
        setAcronyme(''); 
        setNomComplet('');
        setHasUnfilled({});
        setVille('');
        setCollege([]);
        setMdp1('');
        setMdp2('');
    }

    const validate = () => {
        
        let hasUnfilled = {};
        let isValid = true;
        
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
        }
        else {
            setHasUnfilled(hasUnfilled);
        }
    }
/*
    useEffect(() => {
        async function someOtherFunc() {
            let optionsArray = []
            
        setLoading(true)
        let api = new Api();
        api.getDomaines(cookies.get("token").accessToken)
            .then((res) => { 
                for (const element of res) {
                    optionsArray.push({value: element.code, label:element.libelle});
                }
                setOptions(optionsArray);
                setLoading(false);
            })
            .catch(function(err) {  
                setHasErrorAPI(true);
                setLoading(false);
                console.log(err);
            });
        }

        someOtherFunc();
    }, []);
*/

const clic = () => {
    if (mdp1 !== mdp2){
        console.error("Erreur de mdp");
        validate();
    }
    else if (mdp1 == "" && mdp2 == ""){
        console.error("vide");
        validate();
    }
    else{
        console.log("rentre")
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
                            <label htmlFor="acronyme" className="mt-2 mb-2">Indiquez l'acronyme de votre association</label>
                            <input
                                type="text"
                                name="acronyme"
                                value={acronyme}
                                onChange={event => setAcronyme(event.target.value)}
                                className="form-control mt-2"
                                placeholder="Ex : JMC"
                                id="email"/>
                            <div className="text-danger">{hasUnfilled.acronyme}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nomComplet" className="mt-2">Indiquez le nom complet de votre association</label>
                            <input
                                type="text"
                                name="nomComplet"
                                value={nomComplet}
                                onChange={event => setNomComplet(event.target.value)}
                                className="form-control mt-2"
                                placeholder="Ex : Junior MIAGE Concept Bordeaux"
                                id="email"/>
                            <div className="text-danger">{hasUnfilled.nomComplet}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="college" className="mt-2">Indiquez le college dont dépend votre association</label>
                            <select class="form-select" aria-label="Default select example" onChange={(e) => setCollege(e.target.value)}>
                                <option value="A">Collège A</option>
                                <option value="B">Collège B</option>
                                <option value="C">Collège C</option>
                                <option value="D">Collège D</option>
                            </select>
                            <div className="text-danger">{hasUnfilled.college}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ville" className="mt-2">Indiquez la ville de votre association</label>
                            <input
                                type="text"
                                name="ville"
                                value={ville}
                                onChange={event => setVille(event.target.value)}
                                className="form-control mt-2"
                                placeholder="Ex : Bordeaux"
                                id="email"/>
                            <div className="text-danger">{hasUnfilled.ville}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="mdp1" className="mt-2">Choisissez un mot de passe</label>
                            <input
                                type="password"
                                name="mdp1"
                                value={mdp1}
                                onChange={event => { setMdp(event.target.value);setMdp1(event.target.value)}}
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


export default withCookies(FormulaireInscription);