import {Link} from "react-router-dom";
import {AiOutlineFileText, AiOutlineFolder, AiOutlineRollback} from "react-icons/ai";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import React, {useState} from "react";

const NavFormation = (props) => {
    const [afficherTout, setAfficherTout] = useState(false);
    const majAfficherTout = () => {
        setAfficherTout(!afficherTout);
    }
    return (
        <div className="col-md-3" id="arborescence">
            <div className="d-flex justify-content-left">
                <Link to="/" id="linkAccueil">
                    <button type="button" id="buttonArriere"
                            className="btn btn-primary d-flex align-items-center">
                        <AiOutlineRollback className="Icones me-2"/>
                        Revenir à l'accueil
                    </button>
                </Link>
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
                                onClick={() => props.updateState(1)}
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
                                        onClick={() => props.updateState(2)}
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
                                        onClick={() => props.updateState(3)}
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

    )
}

export default NavFormation;