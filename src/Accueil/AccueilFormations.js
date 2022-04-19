import Filtres from './Filtres'
import { useState } from 'react';
import { Link } from "react-router-dom";

const Accueil = () => {

    const [showFormDemande, setShowFormDemande] = useState(false);


    const handleClick = () => {
        setShowFormDemande(true)
      }

    const renderButtonAsso = () => {
        return(
            <>
            <div className="demandeFormation">
                <Link to="/demandeformation">
                    <button type="button" className="btn btn-primary mb-2" onClick={handleClick}>Demander une formation</button>
                </Link>
            </div>
            <div className="demandes">
                <button type="button" className="btn btn-primary">Voir toutes les demandes</button>
            </div>
            </>
        )
    }

    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <span className="">
                            <Filtres/>
                        </span>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col-2">
                            {renderButtonAsso()}
                            </div>
                            <div className="col-5">
                                <div className="d-flex justify-content-center">
                                    <h2><u>Formations à venir</u></h2>
                                </div>
                            </div>
                            <div className="col">
                                <table className="table table-bordered table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col">formation demandées</th>
                                            <th scope="col">formations attribuer</th>
                                            <th scope="col">formation à venir</th>
                                            <th scope="col">formations passées</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>1</td>
                                        <td>1</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="hint-text mt-2">1 à 2 sur <b>2</b> résultats</div>
                        <table className="table table-bordered mt-2">
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
                                <tr>
                                <td>Passée</td>
                                <td>Winter</td>
                                <td>Audit - Qualité</td>
                                <td>Audit de sa structure</td>
                                <td>JMC Bordeaux</td>
                                <td>Théo Perrin</td>
                                <td>13/03/2021</td>
                                <td>
                                        <a href="#editEmployeeModal" className="edit" data-toggle="modal">
                                            <img src={require('../Img/delete.png')} className="Icones"/>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                <td>Passée</td>
                                <td>Winter</td>
                                <td>Audit - Qualité</td>
                                <td>Audit de sa structure</td>
                                <td>JMC Bordeaux</td>
                                <td>Théo Perrin</td>
                                <td>13/03/2021</td>
                                <td>
                                        <a href="#editEmployeeModal" className="edit" data-toggle="modal">
                                            <img src={require('../Img/delete.png')} className="Icones"/>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-primary mt-5">Afficher plus...</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Accueil;