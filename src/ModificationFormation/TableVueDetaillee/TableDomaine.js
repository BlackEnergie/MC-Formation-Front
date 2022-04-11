import React, { useEffect,} from "react";
import tableSort from "table-sort-js/table-sort.js";
import Donnee from '../json/dataDomaine.json';

const TableDomaine = () =>{

    useEffect(() => {
        tableSort()
    },[]);


    const DisplayData = Donnee.data.map(
        (info) => {
            return (
                <tr>
                    <td>{info.id}</td>
                    <td>{info.domaine}</td>
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
                        <th>Domaine(s)</th>
                    </tr>
                </thead>

                <tbody>
                    {DisplayData}
                </tbody>
            </table>
        </>
    )

}

export default TableDomaine;