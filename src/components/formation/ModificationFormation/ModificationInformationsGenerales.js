import React from 'react';
import Donnee from './json/dataInformationsGenerales.json';

const InformationsGeneralesFormation = () =>{
    const AfficherDataDomaine = Donnee.data[0].domaines.map(
        (info) => {
            return (
                <tr key={info.code} title={info.description}>
                    <td>{info.code}</td>
                    <td>{info.libelle}</td>
                </tr>
            )
        }
    )

    const AfficherDataFormateur = Donnee.data[0].formateurs.map(
        (info) => {
            return (
                <tr key={info.id}>
                    <td>{info.id}</td>
                    <td>{info.nom + " " +info.prenom}</td>
                </tr>
            )
        }
    )

    const AfficherDataAssociation = Donnee.data[0].association.map(
        (info) => {
            return (
                <tr key={info.id} title={info.nomComplet}>
                    <td>{info.acronyme}</td>
                    <td>{info.ville}</td>
                </tr>
            )
        }
    )

    const AfficherDataInfoGenerales = Donnee.data.map(
        (info) => {
            return (
                <>
                    <tr key={info.statut}>
                        <th>Statut</th>
                        <td>{info.statut}</td>
                    </tr>
                    <tr key={info.cadre}>
                        <th>Cadre</th>
                        <td>{info.cadre}</td>
                    </tr>
                    <tr key={info.type}>
                        <th>Type</th>
                        <td>{info.type}</td>
                    </tr>
                    <tr key={info.date}>
                        <th>Date</th>
                        <td>{info.date}</td>
                    </tr>
                </>
            )
        }
    )


    return (
        <div className="col">

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
                                {AfficherDataInfoGenerales}
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
                                    {AfficherDataDomaine}
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
                                        <th>#</th>
                                        <th>Nom</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {AfficherDataFormateur}
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
                                    {AfficherDataAssociation}
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