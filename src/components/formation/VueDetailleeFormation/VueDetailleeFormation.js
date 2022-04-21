import './VueDetailleeFormation.css';
import React, {useEffect, useState} from 'react';
import useAxiosPrivate from '../../../auth/hooks/useAxiosPrivate';
import {AiOutlineFileText, AiOutlineFolder, AiOutlineRollback} from "react-icons/ai";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import InformationsGeneralesFormation from "../VueDetailleeFormation/InformationsGeneralesFormation";
import InformationsFicheDeFormation from "../VueDetailleeFormation/InformationsFicheDeFormation";
import FilConducteurFormation from "../VueDetailleeFormation/FilConducteurFormation";
import NavFormation from '../NavigationFormation/NavFormation';

const VueDetailleeFormation = (props) => {
    const [formation, setFormation] = useState(null);
    const [showComponent, setShowComponent] = useState(1);
    const [afficherTout, setAfficherTout] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const majAfficherTout = () => {
        setAfficherTout(!afficherTout);
    } 
    useEffect(() => {
        getFormationDetails();
    }, [])
    const getFormationDetails = async () => {
        try {
            const response = await axiosPrivate.get('/formation/1', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            }); console.log(response.data);
            setFormation(response.data)
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="container-fluid main">
            <div className="row">
                <NavFormation updateState={majShowComponent}/>

                <div className="col">
                    {
                        (showComponent === 1) ? (
                            <InformationsGeneralesFormation/>
                        ) : (<></>)
                    }
                    {
                        (showComponent === 2) ? (
                            <InformationsFicheDeFormation/>
                        ) : (<></>)
                    }
                    {
                        (showComponent === 3) ? (
                            <FilConducteurFormation/>
                        ) : (<></>)
                    }
                </div>
            </div>
        </div>

    )
}

export default VueDetailleeFormation;
