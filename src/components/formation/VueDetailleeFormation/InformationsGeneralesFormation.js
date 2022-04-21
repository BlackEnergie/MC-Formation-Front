import React from 'react';

const InformationsGeneralesFormation = (formation) =>{
    
    let Donnee = formation.formation;
    const AfficherDataInfoGenerales = () => {
        console.log(Donnee);
        return (
            <>
                <tr>
                    <th>Statut</th>
                    <td>{Donnee.statut}</td>
                </tr>
                <tr>
                    <th>Cadre</th>
                    <td>{Donnee.cadre}</td>
                </tr>
                <tr>
                    <th>Type</th>
                    <td>{Donnee.type}</td>
                </tr>
                <tr>
                    <th>Date</th>
                    <td>{Donnee.date}</td>
                </tr>
            </>
        )
    }
    const AfficherDataDomaine = () => Donnee.domaines.map(
        (info) => {
            return (
                <tr key={info.code} title={info.description}>
                    <td>{info.code}</td>
                    <td>{info.libelle}</td>
                </tr>
            )
        }
    )
    const AfficherDataFormateur =() => Donnee.formateurs.map(
        (info) => {
            return (
                <tr key={info.id}>
                    <td>{info.nom}</td>
                    <td>{info.prenom}</td>
                </tr>
            )
        }
    )
    return (
        <div className="container-fluid">
            {/* Conteneur Info Domaines */}
            <div className="container shadow p-4 mb-3 bg-white rounded">
                <div className="row">
                    {/* Conteneur Informations générales */}
                    <div className="col-6">
                        <div className="row d-flex justify-content-between">
                            <h3>Informations Générales</h3>
                        </div>
                        <div className="container">
                            <table className="table table-striped mt-2">
                                <tbody>
                                {AfficherDataInfoGenerales()}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Conteneur Domaines */}
                    <div className="col-6">
                        <div className="row d-flex justify-content-between">
                            <h3>
                                Domaine(s)
                            </h3>
                        </div>

                        {/* Table Domaine */}
                        <div className="container">
                            <div className="table-wrapper">
                                <table className="table table-striped mt-2">
                                    <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Nom</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {AfficherDataDomaine()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Conteneur Formateur Association */}
            <div className="container shadow p-4 mb-3 bg-white rounded">
                <div className="row">

                    {/* Conteneur Formateur */}
                    <div className="col-6">
                        <div className="row d-flex justify-content-between">
                            <h3>Formateur(s)</h3>
                        </div>

                        {/* Table Formateur */}
                        <div className="container">
                            <div className="table-wrapper">
                                <table className="table table-striped mt-2">
                                    <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Prenom</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {AfficherDataFormateur()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Conteneur Association */}
                    <div className="col-6">
                        <div className="row d-flex justify-content-between">
                            <h3>Association(s) intéréssée(s)</h3>
                        </div>

                        {/* Table Association */}
                        <div className="container">
                            <div className="table-wrapper tableFixHead" >
                                <table className="table table-striped mt-2" >
                                    <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Ville</th>
                                    </tr>
                                    </thead>

                                    <tbody >
                                    
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default InformationsGeneralesFormation;