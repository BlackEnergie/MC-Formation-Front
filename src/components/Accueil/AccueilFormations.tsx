import React, { useEffect, useState} from 'react';
import Select from 'react-select';
import TableAccueil from "./TableAccueil/TableAccueil";
import { FetchAllFormation } from '../../serverInteraction/FetchFormation';
import useAxiosPrivate from '../../auth/hooks/useAxiosPrivate';

function Accueil  () {
    const [options, setOptions] = useState([]);
    const [offsetParam, setOffsetParam] = useState(0);
    const [selectedOptionStatut, setSelectedOptionStatut] = useState(null);
    const [selectedOptionNbElements, setSelectedOptionNbElements] = useState({filter: 'nbElements', value : 5, label: '5'});
    const [statutFiltre, setStatutFiltre] = useState("");
    const limitParam = { value: 5 };
    let offset = null;
    let statutParam = null;

    const optionsStatut = [
        {filter: 'statut', value: 'DEMANDE', label: 'Demande'},
        {filter: 'statut', value: 'A_ATTRIBUER', label: 'À attribuer'},
        {filter: 'statut', value: 'A_VENIR', label: 'À venir'},
        {filter: 'statut', value: 'PASSEE', label: 'Passée'}
    ];

    const optionsNbElements = [
        {filter: 'nbElements', value: 5, label: '5'},
        {filter: 'nbElements', value: 10, label: '10'},
        {filter: 'nbElements', value: 20, label: '20'},
        {filter: 'nbElements', value: 50, label: '50'}
    ];

    const optionsArray = [];

    useEffect(() => {
        getFormationsAccueil();
    }, [])


    const getFormationsAccueil = async () : Promise<any> => {
        if (offset == null) {
            for (const element of options) {
                optionsArray.push(element);
            }
        }
        try {
            const response = await FetchAllFormation(useAxiosPrivate(), offset, offsetParam, limitParam, statutParam, statutFiltre);
            for (const element of response.data) {
                optionsArray.push(element);
            }
            setOffsetParam((offset != null ? 0 : offsetParam) + limitParam.value);
            setOptions(optionsArray);
        } catch (err) {
            console.error(err);
        }
    }

    const handleApplyFilters = (option) => {
        setOffsetParam(0);
        if (option) {
            offset = 0;
            if (option.filter === 'statut') {
                statutParam = option.value;
                setStatutFiltre(option.value);
            }
            if (option.filter === 'nbElements') {
                limitParam.value = option.value;
            }
            getFormationsAccueil();
        }
        else {
            offset = 0;
            statutParam = "";
            setStatutFiltre("");
            getFormationsAccueil();
        }
        setOffsetParam(offsetParam + limitParam.value);
    }

    const renderMoreFormation = () => {
        getFormationsAccueil();
        setOffsetParam(offsetParam + limitParam.value);
    }

    return (
        <>
            <div className="container-fluid" id="accueil">
                <div className="row">
                    <div className="col-2 filter-box">
                        <div className="row">
                            <div className="col text-start p-0">
                                <h3 className="form-label color-mc">Filtres</h3>
                            </div>
                        </div>
                        <hr/>
                        <label className="form-label fw-bold mb-2 mt-2">Nombre d'éléments à afficher</label>
                        <Select
                            className="mb-3"
                            value={selectedOptionNbElements}
                            onChange={(option) => {
                                setSelectedOptionNbElements(option);
                                handleApplyFilters(option)
                            }}
                            options={optionsNbElements}
                        />
                        <label className="form-label fw-bold mb-2 mt-2">Statut</label>
                        <Select
                            className="mb-3"
                            isClearable
                            isSearchable
                            value={selectedOptionStatut}
                            placeholder="Statut"
                            onChange={(option) => {
                                setSelectedOptionStatut(option);
                                handleApplyFilters(option)
                            }}
                            options={optionsStatut}
                        />
                    </div>
                    <div className="col">
                        <TableAccueil Donnee={options}/>

                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-mc mt-5"
                                    onClick={renderMoreFormation}>Afficher plus...
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Accueil;
