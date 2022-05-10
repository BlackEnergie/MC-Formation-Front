import React, {} from 'react';

const InformationsFicheDeFormation = (formation) => {

    let Donnee = formation.formation;
    const AfficherFormationDetails = () => {
        return (
            <>
            <tr>
                <th>Type</th>
                <td>{Donnee.type}</td>
            </tr>
            <tr>
                <th>Audience</th>
                <td>{Donnee.audience}</td>
            </tr>
            <tr>
                <th>Durée</th>
                <td>{Donnee.duree}</td>
            </tr>
            <tr>
                <th>Prérequis</th>
                <td>{Donnee.prerequis}</td>
            </tr>
            </>
        )
    }

    const AfficherBesoinsMaterielsFormation = () => Donnee.materiels?.map(
        (info) => {
            return (
                <tr>
                    <td></td>
                    <td>{info}</td>
                </tr>
            )
        }
    )
    const AfficherObjetsPedagogiques = () => Donnee.objectifs?.map(
        (info) => {
            return (
                <tr>
                    <td></td>
                    <td>{info}</td>
                </tr>
            )
        }
    )
    const AfficherDataDomaine = () => Donnee.domaines?.map(
        (info) => {
            return (
                <tr key={info.code} title={info.description}>
                    <td>{info.code}</td>
                    <td>{info.libelle}</td>
                </tr>
            )
        }
    )
    return (
        <div className="container-fluid">

                <div className="row">
                    <div className="col-6">
                        <div className="row d-flex justify-content-between">
                            <h3 className="align-middle me-4">Informations</h3>
                        </div>  
                        <div className="container">
                            <table className="table table-striped mt-2">
                                <tbody>
                                {AfficherFormationDetails()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-6">
                        <h3>
                            Objectif(s) Pédagogique(s)
                        </h3>
                        <div className="container">
                            <div className="table-wrapper">
                                <table className="table table-striped mt-2">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {AfficherObjetsPedagogiques()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <h3>
                            Domaine(s)
                        </h3>
                        <div className="container">
                            <div className="table-wrapper tableFixHead">
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
                    <div className="col-6">
                        <div className="row d-flex justify-content-between">
                            <h3>
                                Besoin(s) matériel(s)
                            </h3>
                        </div>
                        <div className="container">
                            <div className="table-wrapper tableFixHead">
                                <table className="table table-striped mt-2">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {AfficherBesoinsMaterielsFormation()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}
export default InformationsFicheDeFormation;
