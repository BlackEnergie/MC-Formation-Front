import React, {useEffect, useState} from 'react';
import Domaine from "../../../api/model/Domaine";
import Demande from "../../../api/model/Demande";
import toast from 'react-hot-toast';
import Select from 'react-select';
import useAxiosPrivate from '../../../auth/hooks/useAxiosPrivate';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import decodeToken from "../../../auth/decodeToken";
import {AiOutlineRollback} from "react-icons/ai";

const DemandeFormation = () => {
    {/* state formulaire */
    }
    const [sujet, setSujet] = useState('');
    const [detail, setDetail] = useState('');
    const [domaines, setDomaines] = useState([]);
    const [hasUnfilled, setHasUnfilled] = useState({domaines:"",sujet:"",detail:""});
    const [options, setOptions] = useState([]);

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async () => {
        let demande = mapFormToDemande();
        try {
            const response = await axiosPrivate.post('/demande/creer', JSON.stringify(demande), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });
            if (response.data.code == 201) {
                toast.success(response.data.message);
                resetForm()
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error('Une erreur est survenu');
            console.error(err);
        }
    }

    const mapFormToDemande = () => {
        let demande = new Demande()
        let domainesArr = []
        demande.sujet = sujet;
        demande.detail = detail;
        const token = decodeToken(localStorage.getItem('accessToken'))[1];
        demande.nomUtilisateur = token.sub
        domaines.forEach(element => {
            let domaine = new Domaine();
            domaine.code = element.value;
            domainesArr.push(domaine);
        })
        demande.domaines = domainesArr;
        return demande;
    }

    const resetForm = () => {
        setSujet('');
        setDetail('');
        setHasUnfilled({domaines:"",sujet:"",detail:""});
        setDomaines([]);
    }

    const validate = () => {

        let hasUnfilled = {domaines:"",sujet:"",detail:""};
        let isValid = true;

        if (!sujet) {
            isValid = false;
            hasUnfilled["sujet"] = "Renseigner un sujet.";
        }
        if (!detail) {
            isValid = false;
            hasUnfilled["detail"] = "Renseigner les détails de la demande.";
        }
        if (domaines.length === 0) {
            isValid = false;
            hasUnfilled["domaines"] = "Renseigner au moins un domaine.";
        }
        if (isValid) {
            handleSubmit();
        } else {
            setHasUnfilled(hasUnfilled);
        }
    }

    useEffect(() => {

        let isMounted = true;
        let optionsArray = []
        const controller = new AbortController();

        const getDomaines = async () => {
            try {
                const response = await axiosPrivate.get('/data/domaines', {
                    signal: controller.signal,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                    }
                });
                for (const element of response.data) {
                    optionsArray.push({value: element.code, label: element.libelle});
                }
                isMounted && setOptions(optionsArray);
            } catch (err) {
                console.error(err);
                navigate('/connexion', {state: {from: location}, replace: true});
            }
        }

        getDomaines();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <div className="DemandeFormation">
            <div className="col-2 position-absolute">
                <Link to="/" id="linkAccueil">
                    <button type="button" id="buttonArriere"
                            className="btn btn-primary d-flex align-items-center">
                        <AiOutlineRollback className="Icones me-2"/>
                        Revenir à l'accueil
                    </button>
                </Link>
            </div>
            <div className="row justify-content-md-center mt-1">
                <div className="col col-lg-5">
                    <h3 className="color-mc">
                        Demande de formation
                    </h3>
                    <hr/>
                </div>
            </div>
            <div className="row justify-content-md-center">
                <div className="col col-lg-5 ">
                    <form>
                        <div className="form-group mb-3">
                            <label htmlFor="name" className="form-label">Indiquez le ou les domaines de formation ?</label>
                            <SelectComp domaines={domaines} options={options} handleChange={setDomaines}/>
                            <div className="text-danger">{hasUnfilled.domaines}</div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="sujet" className="form-label">Indiquez le sujet de la formation</label>
                            <input
                                type="text"
                                name="sujet"
                                value={sujet}
                                onChange={event => setSujet(event.target.value)}
                                className="form-control"
                                placeholder="Ex : Trésorie"
                                id="email"/>
                            <div className="text-danger">{hasUnfilled.sujet}</div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="detail" className="form-label">Ajoutez des détails sur votre demande de
                                formation</label>
                            <textarea
                                name="detail"
                                value={detail}
                                onChange={event => setDetail(event.target.value)}
                                placeholder="Date souhaité, déroulement, pré-requis, ..."
                                className="form-control"
                                rows={7} />
                            <div className="text-danger">{hasUnfilled.detail}</div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="p-2">
                                <button type="button" className="btn btn-mc" onClick={validate}>
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

export default DemandeFormation;

const SelectComp = ({domaines, options, handleChange}) => {

    return (
        <Select
            isMulti
            isClearable
            isSearchable
            defaultValue={domaines}
            value={domaines}
            placeholder="Veuillez selectionner au moins un domaine"
            onChange={handleChange}
            options={options}
        />
    );
}



