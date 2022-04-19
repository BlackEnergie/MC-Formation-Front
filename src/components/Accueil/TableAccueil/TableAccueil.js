import React, {useEffect,} from "react";
import tableSort from "table-sort-js/table-sort.js";
import {AiOutlineEdit, AiOutlineZoomIn} from "react-icons/ai";
import {Link} from "react-router-dom";

const TableAccueil = ({Donnee}) => {

    useEffect(() => {
        tableSort()
    }, []);

    const DisplayData = () => {
        const display = Donnee.map((info) =>
            <tr key={info.id}>
                <td>{info.statut}</td>
                <td>{info.cadre ? info.cadre:"N/A"}</td>
                <td>{info.domaines.map((domaine) => domaine.libelle + ", ")}</td>
                <td>{info.titre? info.titre : "Provisoire : " + info.sujet}</td>
                <td>{info.association.nomComplet}</td>
                <td>{info.formateurs.length > 0 ? info.formateurs.map((formateur) => formateur.nomComplet) : "Aucun"}</td>
                <td>{info.date ? info.date : "N/A"}</td>
                <td key={info.id}>
                    <Link to={`formation/` + info.id}>
                        <AiOutlineZoomIn className="Icones me-2"/>
                    </Link>
                    <Link to={`formation/edit/` + info.id}>
                        <AiOutlineEdit className="Icones me-2"/>
                    </Link>
                </td>
            </tr>
    )
        return (
            <>
                {display}
            </>
        )
    }

    const nbFormations = Donnee.length;

    return (
        <>
            <div className="hint-text mt-2">1 à {nbFormations} sur <b>{nbFormations}</b> résultats</div>
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
