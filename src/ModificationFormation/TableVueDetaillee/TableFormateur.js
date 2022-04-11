import React, { useEffect,} from "react";
import tableSort from "table-sort-js/table-sort.js";
import Donnee from '../json/dataFormateur.json';

const TableFormateur = () =>{

    useEffect(() => {
        tableSort()
    },[]);


    const DisplayData = Donnee.data.map(
        (info) => {
            return (
                <tr>
                    <td>{info.id}</td>
                    <td>{info.nomFormateur}</td>
                </tr>
            )
        }
    )

    return(
        <>
            <table className="table table-striped table-hover mt-2 table-sort">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Noms des formateurs</th>
                    </tr>
                </thead>

                <tbody>

                    {DisplayData}
                </tbody>
            </table>
        </>
    )

}

export default TableFormateur;