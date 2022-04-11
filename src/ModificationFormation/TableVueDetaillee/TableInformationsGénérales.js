import React, { useEffect,} from "react";
import tableSort from "table-sort-js/table-sort.js";
import Donnee from '../json/dataInformationsGénérales.json';

const TableInformationsGénérales = () =>{

    useEffect(() => {
        tableSort()
    },[]);


    return(
        <>

            <table className="table table-striped table-hover mt-2">

                <tbody>
                    <tr>
                        <th>
                            Statut
                        </th>
                        <td>
                            {Donnee.data[0].statut}
                        </td>
                    </tr>

                    <tr>
                        <th>
                            Cadre
                        </th>
                        <td>
                            {Donnee.data[0].cadre}
                        </td>
                    </tr>

                    <tr>
                        <th>
                            Type
                        </th>
                        <td>
                            {Donnee.data[0].type}
                        </td>
                    </tr>

                    <tr>
                        <th>
                            Date
                        </th>
                        <td>
                            {Donnee.data[0].date}
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )

}

export default TableInformationsGénérales;