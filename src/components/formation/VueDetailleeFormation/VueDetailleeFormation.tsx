import './VueDetailleeFormation.css';
import React, {useEffect, useState} from 'react';
import useAxiosPrivate from '../../../auth/hooks/useAxiosPrivate';
import InformationsGeneralesFormation from "./InformationsGeneralesFormation";
import InformationsFicheDeFormation from "./InformationsFicheDeFormation";
import FilConducteurFormation from "./FilConducteurFormation";
import NavFormation from '../NavigationFormation/NavFormation';
import {useParams} from "react-router-dom";

const VueDetailleeFormation = () =>  {
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
            console.log(formation);
            setShowComponent(1);
        } catch (err) {
            console.error(err);
        }
    }

    const majShowComponent = (val) =>{
        setShowComponent(val);
    }


    return (
        <div className="container-fluid main">
            <div className="row">
                <NavFormation updateState={majShowComponent}/>

                <div className="col">
                    {
                        (showComponent === 1) ? (
                            <InformationsGeneralesFormation formation={formation}/>
                        ) : (<></>)
                    }
                    {
                        (showComponent === 2) ? (
                            <InformationsFicheDeFormation formation={formation}/>
                        ) : (<></>)
                    }
                    {
                        (showComponent === 3) ? (
                            <FilConducteurFormation formation={formation}/>
                        ) : (<></>)
                    }
                </div>
            </div>
        </div>

    )
}

export default VueDetailleeFormation;
