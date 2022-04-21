import React, {useEffect, useState} from 'react';
import ModificationFormationInformationGenerales from "./ModificationInformationsGenerales";
import ModificationFicheDeFormation from "./ModificationFicheDeFormation";
import FilConducteurFormation from "../VueDetailleeFormation/FilConducteurFormation";
import NavFormation from "../NavigationFormation/NavFormation";
import useAxiosPrivate from "../../../auth/hooks/useAxiosPrivate";
import {useParams} from "react-router-dom";
import ModificationInformationsGenerales from "./ModificationInformationsGenerales";

const ModificationFormation = (props) => {

    const [formation, setFormation] = useState(null);
    const [showComponent, setShowComponent] = useState(0);
    const axiosPrivate = useAxiosPrivate();
    let { id } = useParams();

    useEffect(() => {
        getFormationDetails();
    }, [])


    const getFormationDetails = async () => {
        try {
            const response = await axiosPrivate.get('/formation/'+id, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });
            setFormation(response?.data);
            console.log(response.data);

            setShowComponent(1);
        } catch (err) {
            console.error(err);
        }
    }
    const majShowComponent = (val) => {
        setShowComponent(val);
    }

    const sauvegarderTout = () => {
        console.log("sauvergadé ici");
    }

    return (
        <div className="container-fluid main">
            <div className="row">
                <NavFormation updateState={majShowComponent}/>

                <div className="col" id="modificaitionFormation">

                    {
                        (showComponent === 1) ? (
                            <ModificationFormationInformationGenerales formation={formation}/>
                        ) : (<></>)
                    }
                    {
                        (showComponent === 2) ? (
                            <ModificationFicheDeFormation formation={formation}/>
                        ) : (<></>)
                    }
                    {
                        (showComponent === 3) ? (
                            <FilConducteurFormation formation={formation}/>
                        ) : (<></>)
                    }
                    <div className="container-fluid">
                        <div className="container shadow p-3 mb-3 bg-white rounded  d-flex justify-content-center">
                            <button type="button" className="btn btn-mc"
                                    onClick={sauvegarderTout}>Sauvegarder
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default ModificationFormation;
