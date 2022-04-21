import React, {useState} from 'react';
import {AiOutlineFileText, AiOutlineFolder, AiOutlineRollback} from "react-icons/ai";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import InformationsGeneralesFormation from "../VueDetailleeFormation/InformationsGeneralesFormation";
import ModificationFicheDeFormation from "./ModificationFicheDeFormation";
import FilConducteurFormation from "../VueDetailleeFormation/FilConducteurFormation";
import NavFormation from "../NavigationFormation/NavFormation";

const ModificationFormation = (props) => {

    const [showComponent, setShowComponent] = useState(1);

    const majShowComponent = (val) =>{
        setShowComponent(val);
    }

    const sauvegarderTout = () => {
        console.log("sauvergadé ici");
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
                            <ModificationFicheDeFormation/>
                        ) : (<></>)
                    }
                    {
                        (showComponent === 3) ? (
                            <FilConducteurFormation/>
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
