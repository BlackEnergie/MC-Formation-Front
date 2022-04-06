import React, {useEffect} from 'react';
import Select from 'react-select';
import Domaine from "../api/model/Domaine";
import Demande from "../api/model/Demande";
import { useState } from 'react';
import toast from 'react-hot-toast';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const DemandeFormation = () => {

    const [sujet, setSujet] = useState('');
    const [detail, setDetail] = useState('');
    const [errors, setErrors] = useState({});
    const [domaines, setDomaines] = useState([]);
    const notify = () => toast.success('Demande de formation envoyée');

    const handleSubmit = () => {
        
        let demande = mapFormToDemande();
        notify()
        console.log(demande);
        resetForm()
    }

    const mapFormToDemande = () => {
        let demande = new Demande()
        let domainesArr = []
        demande.sujet = sujet;
        demande.detail = detail;
        domaines.forEach(element => {
            let domaine = new Domaine();
            domaine.code = element.value;
            domaine.libelle = element.label;
            domainesArr.push(domaine);
        })
        demande.domaines = domainesArr;
        return demande;
    }

    const resetForm = () => {
        setSujet('');
        setDetail('');
        setErrors({});
        setDomaines([]);
    }

    const validate = () => {
        
        let errors = {};
        let isValid = true;
        
        if (!sujet) {
            isValid = false;
            errors["sujet"] = "Renseigner un sujet.";
        }
        if (!detail) {
            isValid = false;
            errors["detail"] = "Renseigner les détails de la demande.";
        }
        if (domaines.length === 0) {
            isValid = false;
            errors["domaines"] = "Renseigner au moins un domaine.";
        }
        if (isValid) {
            handleSubmit();
        }
        else {
            setErrors(errors);
        }
    }

    return (
        <div className="DemandeFormation">
            <div className="row justify-content-md-center  mt-3">
                <div className="col col-lg-5 border border-dark">
                    <h1 className="justify-content-center align-items-center">
                        <u>DEMANDE DE FORMATION</u>
                    </h1>
                </div>
            </div>
            <div className="row justify-content-md-center mt-3">
                <div className="col col-lg-5 ">
                    <form>
                        <div className="form-group">
                            <label htmlFor="name" className="mt-2 mb-2">Indiquez le ou les domaines de formation ?</label>
                            <SelectComp domaines={domaines} handleChange={setDomaines}/>
                            <div className="text-danger">{errors.domaines}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="sujet" className="mt-2">Indiquez le sujet de la formation</label>
                            <input
                                type="text"
                                name="sujet"
                                value={sujet}
                                onChange={event => setSujet(event.target.value)}
                                className="form-control mt-2"
                                placeholder="Ex : Trésorie"
                                id="email"/>
                            <div className="text-danger">{errors.sujet}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="detail" className="mt-2">Ajoutez des détails sur votre demande de
                                formation</label>
                            <textarea
                                name="detail"
                                value={detail}
                                onChange={event => setDetail(event.target.value)}
                                placeholder="Date, déroulement, pré-requis, ..."
                                className="form-control mt-2"
                                rows="7"/>
                            <div className="text-danger">{errors.detail}</div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="p-2">
                                <input type="button" value="Valider" className="btn btn-primary" onClick={validate}/>
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

export default DemandeFormation;

const SelectComp = ({ domaines, handleChange }) => {

    useEffect(() => {
        const url = "https://api.adviceslip.com/advice"

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log(json);
                } catch (error) {
                console.log("error", error);
                }
        };

        fetchData();
    }, []);

    return (
        <Select
            isMulti 
            isClearable
            isSearchable={false}  
            defaultValue={domaines}
            value={domaines}
            onChange={handleChange}
            options={options}
        />
    );
}