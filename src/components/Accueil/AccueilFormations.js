import { Link } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {useNavigate} from 'react-router-dom';
import Select from 'react-select';

const Accueil = (filtreStatut) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] =  useState(false);
    const [offsetParam,setOffsetParam] = useState(0);
    const [selectedOptionStatut, setSelectedOptionStatut] = useState(null);
    const [statutFiltre, setStatutFiltre] = useState("");
    const limitParam=2;
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    let statut = null;
    let offset = null;
    const optionsStatut = [
        { value: 'DEMANDE', label: 'Demandé' },
        { value: 'A_ATTRIBUER', label: 'A attribuer' },
        { value: 'A_VENIR', label: 'A venir' },
        { value: 'PASSE', label: 'Passée' }
      ];
    var optionsArray = [];
      
    useEffect(() => {
        setLoading(true)
        getFormationsAccueil();
    }, [])

   
    const getFormationsAccueil = async () => {
        if(offset==null){
            for(const element of options){
                optionsArray.push(element);
            }
        }
        try {
            const response = await axiosPrivate.get('/formations', {
                params: {offset:(offset!=null?0:offsetParam),limit:limitParam,statut :(statut!=null?statut:statutFiltre)},
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });
            console.log(response.data);
            for (const element of response.data) {
                optionsArray.push(element);
                }
            setOffsetParam((offset!=null?0:offsetParam)+limitParam);
            setOptions(optionsArray);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error(err);
        }
    }
    const handleClick = () => {
        navigate('/demande'); 
    }
    const handleClickValidate = () => {
        setOffsetParam(0);
        if(selectedOptionStatut[0]){
                offset=0;
                statut=selectedOptionStatut[0].value;
                setStatutFiltre(selectedOptionStatut[0].value);
                getFormationsAccueil();
                renderTabFormation();
        }
        else{
            offset=0;
            statut="";
            setStatutFiltre("");
            getFormationsAccueil();
            renderTabFormation();
        }
      
        setOffsetParam(offsetParam+limitParam);
        
    }

    const renderButtonAsso = () => {
        return(
            <>
            <div className="demandeFormation">
                <Link to="/demandeformation">
                    <button type="button" className="btn btn-primary mb-2" onClick={handleClick}>Demander une formation</button>
                </Link>
            </div>
            </>
        )
    }
    
    const renderMoreFormation=() =>{
        getFormationsAccueil();
        renderTabFormation();
        setOffsetParam(offsetParam+limitParam);
    }
    const renderTabFormation = () => {
        const listItems = options.map((formation) =>
        <tr>
            <td>{formation.statut}</td>
            <td>{formation.cadre}</td>
            <td>{formation.domaines.map((domaine)=>domaine.libelle)}</td>
            <td>{formation.nom}</td>
            <td>{formation.association.acronyme}</td>
            <td>{formation.formateurs ? formation.formateurs.map((formateur)=>formateur.nomComplet):""}</td>
            <td>{formation.date}</td>
        </tr>);

        return(
            <>
            { 
             listItems
            }   
        </>
        )
        }
        return(
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <span className="">
                        <label><u>Statut</u></label>
                        <Select
                            isClearable 
                            value={selectedOptionStatut}
                            placeholder=""
                            onChange={setSelectedOptionStatut}
                            options={optionsStatut}
                            />
                        </span>
                        <div className="mt-2">
                            <button type="button" className="btn btn-primary m-2">Reset</button>
                            <button type="button" className="btn btn-primary" onClick={handleClickValidate}>Valider</button>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col-2">
                            {renderButtonAsso()}
                            </div>
                            <div className="col-5">
                                <div className="d-flex justify-content-center">
                                    <h2><u>Formations à venir</u></h2>
                                </div>
                            </div>
                        </div>
                        <div className="hint-text mt-2">1 à 2 sur <b>2</b> résultats</div>
                        <table className="table table-bordered mt-2">
                            <thead>
                                <tr>
                                    <th scope="col">Statut</th>
                                    <th scope="col">Cadre</th>
                                    <th scope="col">Domaine(s)</th>
                                    <th scope="col">Titre</th>
                                    <th scope="col">Association(s) demandante(s)</th>
                                    <th scope="col">Formateur(s)</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderTabFormation()}
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-primary mt-5" onClick={renderMoreFormation}>Afficher plus...</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Accueil;