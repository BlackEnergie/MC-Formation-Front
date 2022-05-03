import React, {useEffect,} from "react";
import tableSort from "table-sort-js/table-sort.js";
import {AiOutlineEdit, AiOutlineZoomIn} from "react-icons/ai";
import {Link} from "react-router-dom";
import {statutToString, statutToStyle} from "../../../utils/StatutUtils";
import decodeToken from "../../../auth/decodeToken";

const TableAccueil = ({Donnee}) => {

    useEffect(() => {
        tableSort()
    }, []);


    const checkRoleAsso = () => {
        const token = decodeToken(localStorage.getItem("accessToken"))[1];
        return token.role === "ROLE_ASSO"
    }

    const domaineLibelleList = (domaines) => {
        let list = [];
        domaines.map((domaine) => {
            list.push(domaine.libelle)
        })
        return list;
    }


    const DisplayData = () => {
        const display = Donnee.map((info) =>
            <tr key={info.id}>
                <td className={statutToStyle(info.statut)}>{statutToString(info.statut)}</td>
                <td>{info.cadre ? info.cadre : "N/A"}</td>
                <td>{domaineLibelleList(info.domaines).join(", ")}</td>
                <td>{info.titre ? info.titre : "Provisoire : " + info.sujet}</td>
                <td title={info.association.nomComplet}>{info.association.acronyme}</td>
                <td>{info.formateurs.length > 0 ? info.formateurs.map((formateur) => formateur.nomComplet) : "Aucun"}</td>
                <td>{info.date ? info.date : "N/A"}</td>
                <td className="text-center" key={info.id}>
                    <Link to={'/formation/' + info.id}>
                        <AiOutlineZoomIn className="Icones me-2"/>
                    </Link>
                    {checkRoleAsso() ?
                        (<></>) :
                        (<Link to={'/formation/edit/' + info.id}>
                            <AiOutlineEdit className="Icones me-2"/>
                        </Link>)}
                </td>
            </tr>
        )
        return (
            <>
                {
                    Donnee.length > 0 ? display : <tr>No data</tr>
                }
            </>
        )
    }

    const nbFormations = Donnee.length;

    return (
        <>
            <div className="row">
                <div className="col p-0">
                    <h3 className="form-label color-mc">Formations</h3>
                </div>
                <div className="col text-end">
                    <div className="hint-text"><b>{nbFormations}</b> résultat{nbFormations>1?"s":""}</div>
                </div>
            </div>
            <hr/>
            <div className="table-wrapper" id="tableAccueil">
                <table className="table table-striped mt-2 table-sort table-arrows">
                    <thead>
                    <tr>
                        <th scope="col">Statut</th>
                        <th scope="col">Cadre</th>
                        <th scope="col">Domaine(s)</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Association</th>
                        <th scope="col">Formateur(s)</th>
                        <th scope="col">Date</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {DisplayData()}
                    </tbody>
                </table>
            </div>
        </>
    )

}

export default TableAccueil;
