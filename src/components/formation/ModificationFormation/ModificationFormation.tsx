import React, {useEffect, useState} from 'react';
import ModificationFormationInformationGenerales from "./ModificationInformationsGenerales";
import ModificationFicheDeFormation from "./ModificationFicheDeFormation";
import ModificationFilConducteur from "./ModificationFilConducteur";
import NavFormation from "../NavigationFormation/NavFormation";
import {useParams} from "react-router-dom";
import { FetchFormationById } from '../../../serverInteraction/FetchFormation';
import useAxiosPrivate from '../../../auth/hooks/useAxiosPrivate';
import Formation from '../../../api/model/Formation';

const ModificationFormation = () => {
    const INITIAL_FORMATION : Formation = new Formation()

    const [formation, setFormation] = useState(INITIAL_FORMATION);
    const [showComponent, setShowComponent] = useState(0);
    /*const [itemsPartie, setItemsParties] = useState(formation.parties);*/


    let { id } = useParams();

    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        getFormationDetails();
    }, [])


    const getFormationDetails = async () => {
        try {
            const response = await FetchFormationById(axiosPrivate, id)
            setFormation(response?.data);
            setShowComponent(1);
        } catch (err) {
            console.error(err);
        }
    }
    const majShowComponent = (val) => {
        setShowComponent(val);
    }

    const sauvegarderTout = () => {
        // TODO: Save
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
                            <ModificationFicheDeFormation/>
                        ) : (<></>)
                    }
                    {
                        (showComponent === 3) ? (
                            <ModificationFilConducteur formation={formation}/>
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
