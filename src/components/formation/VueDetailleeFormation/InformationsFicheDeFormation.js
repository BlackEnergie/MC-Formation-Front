import React, {} from 'react';
import Donnees from './json/InformationFicheDeFormation.json';

const InformationsFicheDeFormation = (formation) =>{
    let Donnee = formation.formation;
    console.log(Donnee);
    const AfficherType = () => {
            return (
                <>{Donnee.type}</>
            )
    }
    
    const AfficherBesoinsMaterielsFormation = () => Donnee.materiels.map(
        (info) => {
            return (
                <tr>
                    <td>{info}</td>
            
                </tr>
            )
        }
    )
    const AfficherobjetsPedagogiques = Donnees.data[0].objetsPedagogiques.map(
        (info) => {
            return (
                <tr key={info.id} title={info.BesoinMater}>
                    <td>{info.id}</td>
                    <td>{info.objet }</td>
                </tr>
            )
        }
    )
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
    return(
        <div className="container-fluid">
        <div className="container shadow p-4 mb-3 bg-white rounded">
            <div className="row">
                <div className="d-flex  mb-3">
                    <div className="d-flex align-items-center ">
                        <h3 className="align-middle m-0" >Type</h3>
                    </div>

                    <div className="d-flex align-items-center ms-3">
                       <h4 className="align-middle" >{AfficherType()}</h4>
                    </div>
                </div>

                <div className="col-6">
                    <h3 className="mt-2">
                        Objectifs pédagogiques
                    </h3>
                    <div className="container">
                        <div className="table-wrapper tableFixHead" >
                            <table className="table table-striped mt-2" >
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Objectifs</th>
                                </tr>
                                </thead>
                                <tbody>
                                {AfficherobjetsPedagogiques}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container shadow p-4 mb-3 bg-white rounded">
            <div className="row">
                <div className="col-6">
                        <h3 className="mt-2">
                            Domaines
                        </h3>
                        <div className="container">
                            <div className="table-wrapper tableFixHead" >
                                <table className="table table-striped mt-2" >
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
                                Besoins matériel 
                            Besoins matériel 
                                Besoins matériel 
                            </h3>
                    </div>
                    <div className="container">
                        <div className="table-wrapper tableFixHead" >
                                    <table className="table table-striped mt-2" >
                                        <thead>
                                            <tr>
                                            <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody >
                                        {AfficherBesoinsMaterielsFormation()}
                                        </tbody>

                                    </table>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default InformationsFicheDeFormation ;
