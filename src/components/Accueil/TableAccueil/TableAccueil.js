import React, { useEffect,} from "react";
import tableSort from "table-sort-js/table-sort.js";
import Donnee from '../json/data.json';
import {AiOutlineZoomIn, AiOutlineEdit} from "react-icons/ai";

const TableAccueil = (props) =>{

    useEffect(() => {
        tableSort()
    },[]);


    const DisplayData = Donnee.data.map(
        (info) => {
            return (
                <tr key={info.id}>
                    <td>{info.statut}</td>
                    <td>{info.cadre}</td>
                    <td>{info.domaine}</td>
                    <td>{info.titre}</td>
                    <td>{info.association}</td>
                    <td>{info.formateur}</td>
                    <td>{info.date}</td>
                    <td key={info.id}>
                        <button className="btn" onClick={() => props.updateVue(info.id)}>
                            <AiOutlineZoomIn className="Icones me-2"/>
                        </button>
                        <button className="btn" onClick={() => props.updateModif(info.id)}>
                            <AiOutlineEdit className="Icones me-2"/>
                        </button>
                    </td>
                </tr>
            )
        }
    )
    const nbFormations = Object.keys(Donnee.data).length;


    return(
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
                    {DisplayData}
                    </tbody>
                </table>
            </div>
        </>
    )

}

export default TableAccueil;