import React, {} from 'react';
import Donnee from '../VueDetailleeFormation/json/InformationFicheDeFormation.json';




const AfficherType = Donnee.data.map(
    (info) => {
        return (
            <p key={info.id}>
                <td>{info.type}</td>
            </p>
        )
    }
)

const AfficherBesoinsMaterielsFormation = Donnee.data[0].BesoinsMaterielsFormation.map(
    (info) => {
        return (
            <tr key={info.id}>
     
                <li>{info.nom }</li>
            </tr>
        )
    }
)

const AfficherobjetsPedagogiques = Donnee.data[0].objetsPedagogiques.map(
    (info) => {
        return (
            <tr key={info.id}>
                <td>{info.id}</td>
                <td>{info.objet }</td>
            </tr>
        )
    }
)

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

function InformationsFicheDeFormation (){
  
    return(
        <>
        <div className="container shadow p-4 mb-3 bg-white rounded">
            <div className="row">
                <h3 className="mt-2">
                   Type
                </h3>
                <br/>
                <div>
                    <div className="row  mb-3">
                        <div className="col-2">
                           <h4>{AfficherType}</h4>
                        </div>
                    </div>
                </div>
         
                <div className="row  mb-3" >
                    <h3 className="mt-2">
                        Objectifs pédagogiques
                    </h3>
                   
                    <div className="col-6">
                        <div className="container">
                            <div className="table-wrapper">
                                <table className="table table-striped mt-2">
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
        </div>
        <div className="container shadow p-4 mb-3 bg-white rounded">
            <div className="row">
                <div className="col-6">
                    <div className="row d-flex justify-content-between">
                        <h3 className="mt-2">
                            Domaines
                        </h3>
                    </div>
                        <div className="container">
                        <div className="table-wrapper tableFixHead" >
                                <table className="table table-striped mt-2" >
                                    <thead>
                                        <tr>
                                            <th>#</th>
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
                <div className="col-6">
                    <h3 className="mt-2">
                        Besoins matériel 
                    </h3>
                    <div className="row d-flex justify-content-between">
                    {/* Table Association */}
                        <div className="container">
                            <div className="table-wrapper tableFixHead" >
                                <table className="table table-striped mt-2" >
                                <thead>
                                        <tr>
                                            <th>#</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody >
                                    {AfficherBesoinsMaterielsFormation}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

             
          
        </>
    );
}
export default InformationsFicheDeFormation ;