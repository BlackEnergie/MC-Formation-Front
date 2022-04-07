import React, {Component} from 'react';
import {AiOutlinePlusCircle} from 'react-icons/ai'
import {IconContext} from "react-icons"
import './informatonsFicheDeFormation.css'

class InformationsFicheDeFormation extends Component {


    render() {
        return (

            <div className="container-fluid mt-10" className="main">

                <div className="row  mb-3">
                    <h2 className="mt-2">
                        <ins>Information</ins>
                    </h2>

                </div>

                <div className="container-fluid shadow p-3 mb-3 bg-white rounded">

                    <div className="row  mb-3">
                        <div className="col-2">
                            <h4 className="mb-3">
                                <ins>Type</ins>
                            </h4>
                            <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                                <option value="1">Formation</option>
                                <option value="2">Ateler</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="container-fluid shadow p-3 mb-3 bg-white rounded">
                    <div className="row  mb-3">

                        <h4>
                            <ins>Objectif Pédagogiques</ins>
                        </h4>
                        <p className="mb-3"><small><em>(a l'issue de la formation, les stagiaires seront capable de
                            ...)</em></small></p>
                        <div className="col-sm-4">
                            <button type="button" className="btn btn-outline-secondary">
                                <IconContext.Provider value={{className: "AiOutlinePlusCircle-icon"}}>
                                    <AiOutlinePlusCircle/>
                                </IconContext.Provider>Ajouter une ligne
                            </button>
                        </div>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Objectif</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">1.</th>
                                <td>
                                    <input type="text" className="form-text" placeholder="A déterminer"/>
                                </td>
                                <td>
                                    <a href="#editEmployeeModal" className="edit" data-toggle="modal">
                                        <img src={require('../Img/delete.png')} className="Icones"/>
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>


                    </div>
                </div>
                <div className="container-fluid shadow p-1 mb-3 bg-white rounded">
                    <div className="row  mb-3">

                        <h4 className="mb-3">
                            <ins>Domaine de formation</ins>
                        </h4>
                        <div className="col-sm-4">
                            <button type="button" className="btn btn-outline-secondary">
                                <IconContext.Provider value={{className: "AiOutlinePlusCircle-icon"}}>
                                    <AiOutlinePlusCircle/>
                                </IconContext.Provider>Ajouter une ligne
                            </button>
                        </div>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Objectif</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">1.</th>
                                <td>
                                    <input type="text" className="form-text" placeholder="A déterminer"/>
                                </td>
                                <td>
                                    <a href="#editEmployeeModal" className="edit" data-toggle="modal">
                                        <img src={require('../Img/delete.png')} className="Icones"/>
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="container-fluid shadow p-2 bg-white rounded">
                    <div className="row  mb-3">
                        <div className='col-5'>
                            <h4 className="mb-3">
                                <ins>Besoins matériels de la formation</ins>
                            </h4>
                            <div className="card">
                                <ul className="panel">
                                    <li>Tableau</li>
                                    <li>Projecteur</li>
                                    <li>Feutres</li>
                                    <li>Capotes</li>
                                    <li>La teub de théo</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3"></div>
            </div>


        )
    }

}

export default InformationsFicheDeFormation;