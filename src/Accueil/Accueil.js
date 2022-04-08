import React, {useState, useEffect, Component} from 'react';
import { withCookies, Cookies } from 'react-cookie';
import Filtres from './Filtres'
import { instanceOf } from 'prop-types';
import DemandeFormation from '../demandeFormation/DemandeFormation';

const cookies = new Cookies();

class Accueil extends Component {
    

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
    constructor(props){
        super(props);
        this.state={
            token: cookies.get('token') || '',
            showFormDemande:false
            
        }
        this.handleClick = this.handleClick.bind(this)
    };

    handleClick(){
        this.setState({showFormDemande:true})
      };

    renderButtonAsso(){
        return(
            <>
            { 
                cookies.get("token") && cookies.get("token").roles[0]==="ROLE_ASSO" ? (
                <>    
                <div className="demandeFormation">
                    <button type="button" className="btn btn-primary mb-2" onClick={this.handleClick}>Demander une formation</button>
                </div>
                <div className="demandes">
                    <button type="button" className="btn btn-primary">Voir toutes les demandes</button>
                </div>
               </>
                ) : (<div></div>)
            }   
         </>
        )
    };


    render() {
        return(
            <>
            { 
            this.state.showFormDemande===false ? (
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
                            {this.renderButtonAsso()}
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
                                    <a href="#editEmployeeModal" data-toggle="modal">
                                            <img src={require('../Img/delete.png')} className="Icones"/>
                                    </a>
                                </tr>
                                <tr>
                                    <td>Passée</td>
                                    <td>Winter</td>
                                    <td>Audit - Qualité</td>
                                    <td>Audit de sa structure</td>
                                    <td>JMC Bordeaux</td>
                                    <td>Théo Perrin</td>
                                    <td>13/03/2021</td>
                                    <a href="#editEmployeeModal" className="edit" data-toggle="modal">
                                            <img src={require('../Img/delete.png')} className="Icones"/>
                                    </a>
                                </tr>
                            </tbody>
                        </table>

                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-primary mt-5">Afficher plus...</button>
                        </div>
                    </div>
                </div>
            </div>
            ): (<DemandeFormation/>)
            }
            </>
        )
    }
}
export default withCookies(Accueil);