import React from 'react';

const FilConducteurFormation = (formation) =>{
    
    let Donnee = formation.formation;
    const AfficherDataFilConducteur = Donnee.data.map(
        (info) => {
            return (
                <tr key={info.id}>
                    <td>{info.id}</td>
                    <td>{info.plan}</td>
                    <td>{info.timing}</td>
                    <td>{info.contenu}</td>
                    <td>{info.methodologie}</td>
                </tr>
            )
        }
    )

    return(
        <div className="container-fluid mt-10 main" >
            <div className="row">
                <h2 className="mt-2">
                    Fil conducteur
                </h2>
            </div>


            <div className="container-fluid shadow p-3 mb-3 bg-white rounded">
                <div className="row  mb-3">

                    {/* Table filConducteur */}
                    <div className="container">
                        <div className="table-wrapper">
                            <table className="table table-striped mt-2">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Plan / Partie</th>
                                        <th>Timing</th>
                                        <th>Contenu</th>
                                        <th>Méthodologie pédagogique</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {AfficherDataFilConducteur}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilConducteurFormation;