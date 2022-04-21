import './VueDetailleeFormation.css';
import React, {useState} from 'react';
import InformationsGeneralesFormation from "../VueDetailleeFormation/InformationsGeneralesFormation";
import InformationsFicheDeFormation from "../VueDetailleeFormation/InformationsFicheDeFormation";
import FilConducteurFormation from "../VueDetailleeFormation/FilConducteurFormation";
import NavFormation from '../NavigationFormation/NavFormation';

const VueDetailleeFormation = (props) => {

    const [showComponent, setShowComponent] = useState(1);

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
