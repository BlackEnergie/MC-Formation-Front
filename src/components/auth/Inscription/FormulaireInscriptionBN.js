import React, {useEffect} from 'react';
import MembreBureauNational from "../api/model/MembreBureauNational";
import { useState } from 'react';
import Api from '../api/Api';
import Select from 'react-select';
import { withCookies, Cookies } from 'react-cookie';

const cookies = new Cookies();
const FormulaireInscription = () => {
    const [poste, setPoste] = useState('');
    const [mdp1, setMdp1] = useState('');
    const [mdp2, setMdp2] = useState('');
    const [mdp, setMdp] = useState('');
    const [hasUnfilled, setHasUnfilled] = useState({});
    const [options, setOptions] = useState([]);
    const [hasErrorAPI, setHasErrorAPI] =  useState(false);
    const [loading, setLoading] =  useState(false);


    const handleSubmit = () => {
        let MembreBureauNational = mapFormToMembreBureauNational();
        let api = new Api();
        console.log(JSON.stringify(MembreBureauNational))
        api.postInscription(MembreBureauNational, "a4085a87-0c76-4d78-940b-3049309eaa2b")
        //api.postInscription(MembreBureauNational,cookies.get("token").accessToken)
        .then(() => { 
            resetForm()
        })
        .catch(function(err) {  
            setHasErrorAPI(true);
            console.log(err);
        });
    }

    //(le token retourne rôle + mail)
    const mapFormToMembreBureauNational = () => {
        let membreBureauNational = new MembreBureauNational("alexis.peron41@gmail.com", mdp, "alexis.peron41@gmail.com", poste)
        console.log(membreBureauNational);
        return membreBureauNational;
    }


    const resetForm = () => {
        setPoste(''); 
        setHasUnfilled({});
        setMdp1('');
        setMdp2('');
    }

    const validate = () => {
        
        let hasUnfilled = {};
        let isValid = true;
        
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