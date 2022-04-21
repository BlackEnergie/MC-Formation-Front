import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import useAxiosPrivate from '../../auth/hooks/useAxiosPrivate';
import Select from 'react-select';
import decodeToken from "../../auth/decodeToken";
import TableAccueil from "./TableAccueil/TableAccueil";

const Accueil = () => {
    const [options, setOptions] = useState([]);
    const [offsetParam, setOffsetParam] = useState(0);
    const [selectedOptionStatut, setSelectedOptionStatut] = useState(null);
    const [statutFiltre, setStatutFiltre] = useState("");
    const limitParam = 10;
    const axiosPrivate = useAxiosPrivate();
    let statut = null;
    let offset = null;
    const optionsStatut = [
        {value: 'DEMANDE', label: 'Demandé'},
        {value: 'A_ATTRIBUER', label: 'A attribuer'},
        {value: 'A_VENIR', label: 'A venir'},
        {value: 'PASSE', label: 'Passée'}
    ];
    var optionsArray = [];

    useEffect(() => {
        getFormationsAccueil();
    }, [])


    const getFormationsAccueil = async () => {
        if (offset == null) {
            for (const element of options) {
                optionsArray.push(element);
            }
        }
        try {
            const response = await axiosPrivate.get('/formations', {
                params: {
                    offset: (offset != null ? 0 : offsetParam),
                    limit: limitParam,
                    statut: (statut != null ? statut : statutFiltre)
                },
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });
            for (const element of response.data) {
                optionsArray.push(element);
            }
            setOffsetParam((offset != null ? 0 : offsetParam) + limitParam);
            setOptions(optionsArray);
        } catch (err) {
            console.error(err);
        }
    }

    const handleApplyFilters = () => {
        setOffsetParam(0);
        if (selectedOptionStatut && selectedOptionStatut[0]) {
            offset = 0;
            statut = selectedOptionStatut[0].value;
            setStatutFiltre(selectedOptionStatut[0].value);
            getFormationsAccueil();
        } else {
            offset = 0;
            statut = "";
            setStatutFiltre("");
            getFormationsAccueil();
        }

        setOffsetParam(offsetParam + limitParam);

    }

    const checkRoleAsso = () => {
        const token = decodeToken(localStorage.getItem("accessToken"))[1];
        return token.role === "ROLE_ASSO"
    }

    const renderButtonAsso = () => {
        return (
            <>
                {
                    checkRoleAsso() ? (
                        <div className="demandeFormation col-2">
                            <Link to="/demandeFormation">
                                <button type="button" className="btn btn-primary mb-2">
                                    Demander une formation
                                </button>
                            </Link>
                        </div>
                    ): (<></>)
                }
            </>
        )
    }

    const renderMoreFormation = () => {
        getFormationsAccueil();
        setOffsetParam(offsetParam + limitParam);
    }

    return (
        <>
            <div className="container-fluid" id="accueil">
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
                            <button type="button" className="btn btn-primary" onClick={handleApplyFilters}>Valider
                            </button>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    {renderButtonAsso()}
                                </div>
                            </div>
                        </div>

                        <TableAccueil Donnee={options}/>

                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-primary mt-5"
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
