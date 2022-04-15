import Filtres from './Filtres'
import DemandeFormation from '../demandeFormation/DemandeFormation';
import React, {useState, useRef, useEffect} from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {useNavigate, useLocation } from 'react-router-dom';
import { render } from '@testing-library/react';

const Accueil = () => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] =  useState(false);

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        
        let isMounted = true;
        let optionsArray = [];
        const controller = new AbortController();
        setLoading(true)
        const getFormationsAccueil = async () => {
        try {
            const response = await axiosPrivate.get('/formations', {
                params: {offset:0,limit:6,statut:"DEMANDE",domaines:2,datedebut:"2022-04-13",datefin:"2022-04-14",cadre:"fdsfsdf"},
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });
            console.log(response.data);
            for (const element of response.data) {
                optionsArray.push(element);
                }
            isMounted && setOptions(optionsArray);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error(err);
            navigate('/', { state: { from: location }, replace: true });
        }
    }
        getFormationsAccueil();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
   

    const handleClick = () => {
        navigate('/demande'); 
      }

    const renderButtonAsso = () => {
        return(
            <>
            { 
                <>    
                <div className="demandeFormation">
                    <button type="button" className="btn btn-primary mb-2" onClick={handleClick}>Demander une formation</button>
                </div>
                <div className="demandes">
                    <button type="button" className="btn btn-primary">Voir toutes les demandes</button>
                </div>
               </>
            }   
         </>
        )
    }
    const listItems = options.map((formation) =>
    <tr>
        <td>{formation.statut}</td>
        <td>{formation.cadre}</td>
        <td>{formation.domaines.map((domaine)=>domaine.libelle)}</td>
        <td>{formation.nom}</td>
        <td>{formation.association.acronyme}</td>
        <td>{formation.formateurs.map((formateur)=>formateur.nomComplet)}</td>
        <td>{formation.date}</td>
        </tr>);
    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <span className="">
                            <Filtres/>
                        </span>
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
                            <div className="col">
                                <table className="table table-bordered table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col">formation demandées</th>
                                            <th scope="col">formations attribuer</th>
                                            <th scope="col">formation à venir</th>
                                            <th scope="col">formations passées</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>1</td>
                                        <td>1</td>
                                        </tr>
                                    </tbody>
                                </table>
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
                                {listItems}
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-primary mt-5">Afficher plus...</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Accueil;