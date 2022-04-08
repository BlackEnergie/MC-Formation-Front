import React, { useEffect,} from "react";
import tableSort from "table-sort-js/table-sort.js";
import Donnee from '../json/data.json';
import {AiOutlineZoomIn} from "react-icons/ai";
import {IconContext} from "react-icons"

const TableAccueil = () =>{
    useEffect(() => {
        tableSort()
    },[]);

    const DisplayData = Donnee.data.map(
        (info) => {
            return (
                <tr>
                    <td>{info.statut}</td>
                    <td>{info.cadre}</td>
                    <td>{info.domaine}</td>
                    <td>{info.titre}</td>
                    <td>{info.association}</td>
                    <td>{info.formateur}</td>
                    <td>{info.date}</td>
                    <td>
                        <a href="/" className="edit">
                            <IconContext.Provider value={{className: "AiOutlineZoomIn"}}>
                                <AiOutlineZoomIn className="Icones"/>
                            </IconContext.Provider>
                        </a>
                    </td>
                </tr>
            )
        }
    )
    const nbFormations = Object.keys(Donnee.data).length;


    return(
        <>
        <div className="hint-text mt-2">1 à {nbFormations} sur <b>{nbFormations}</b> résultats</div>
        <table className="table table-bordered mt-2 table-sort table-arrows">
            <thead>
            <tr>
                <th scope="col">Statut</th>
                <th scope="col">Cadre</th>
                <th scope="col">Domaine(s)</th>
                <th scope="col">Titre</th>
                <th scope="col">Association(s) demandante(s)</th>
                <th scope="col">Formateur(s)</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            {DisplayData}
            </tbody>
        </table>
        </>
    )

}

export default TableAccueil;