import React, {useState} from 'react';
import {AiOutlineFileText, AiOutlineFolder, AiOutlineRollback} from "react-icons/ai";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import InformationsGeneralesFormation from "../VueDetailleeFormation/InformationsGeneralesFormation";
import InformationsFicheDeFormation from "../VueDetailleeFormation/InformationsFicheDeFormation";
import FilConducteurFormation from "../VueDetailleeFormation/FilConducteurFormation";

const ModificationFormation = (props) => {

    const [showComponent, setShowComponent] = useState(1);
    const [afficherTout, setAfficherTout] = useState(false);

    const majAfficherTout = () => {
        setAfficherTout(!afficherTout);
    }

    return (
        <div className="container-fluid main">
            <div className="row">
                <div className="col-md-3" id="arborescence">
                    <div className="d-flex justify-content-left">
                        <button type="button" id="buttonArriere"
                                className="btn btn-primary d-flex align-items-center"
                                onClick={() => props.updateState(0)}>
                            <AiOutlineRollback className="Icones me-2"/>
                            Revenir à l'accueil
                        </button>
                    </div>

                    <div className="row">
                        <table className="table table-borderless ">
                            <tbody>
                            <tr>
                                <td>
                                    <AiOutlineFileText className="Icones"/>
                                </td>
                                <td>
                                    <a
                                        onClick={() => setShowComponent(1)}
                                        className="text-decoration-none link-dark text-start">
                                        Informations générales
                                    </a>

                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <AiOutlineFolder className="Icones"/>
                                </td>
                                <td>
                                    <a
                                        className="text-decoration-none link-dark"
                                        onClick={() => majAfficherTout()}>
                                        Fiche de Formation
                                    </a>
                                </td>
                                <td>
                                    {afficherTout ? (
                                        <FaChevronUp className="Icones"/>
                                    ) : (
                                        <FaChevronDown className="Icones"/>
                                    )
                                    }

                                </td>
                            </tr>

                            {afficherTout ? (
                                <>
                                    <tr>
                                        <td>
                                        </td>
                                        <td className="d-inline-flex">
                                            <AiOutlineFileText className="Icones me-2"/>
                                            <a
                                                onClick={() => setShowComponent(2)}
                                                className="text-decoration-none link-dark">
                                                Informations
                                            </a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>

                                        </td>
                                        <td className="d-inline-flex">
                                            <AiOutlineFileText className="Icones me-2"/>
                                            <a
                                                onClick={() => setShowComponent(3)}
                                                className="text-decoration-none link-dark">
                                                Fil Conducteur
                                            </a>
                                        </td>
                                    </tr>
                                </>
                            ) : (<></>)
                            }

                            </tbody>
                        </table>
                    </div>
                </div>
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

export default ModificationFormation;
