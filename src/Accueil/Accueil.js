import React, {Component} from 'react';
import {Cookies, withCookies} from 'react-cookie';
import Filtres from './Filtres'
import {instanceOf} from 'prop-types';
import DemandeFormation from '../demandeFormation/DemandeFormation';
import TableAccueil from './TableAccueil/TableAccueil';
import './Accueil.css';

const cookies = new Cookies();

class Accueil extends Component {


    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            token: cookies.get('token') || '',
            showFormDemande: false

        }
        this.handleClick = this.handleClick.bind(this)
    };

    handleClick() {
        this.setState({showFormDemande: true})
    };

    renderButtonAsso() {
        return (
            <>
                {
                    cookies.get("token") && cookies.get("token").roles[0] === "ROLE_ASSO" ? (
                        <>
                            <div className="demandeFormation">
                                <button type="button" className="btn btn-primary mb-2"
                                        onClick={this.handleClick}>Demander une formation
                                </button>
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
        return (
            <>
                {
                    this.state.showFormDemande === false ? (
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
                                                    <th scope="col">Formations demandées</th>
                                                    <th scope="col">Formations à attribuer</th>
                                                    <th scope="col">Formations à venir</th>
                                                    <th scope="col">Formations passées</th>
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

                                    <TableAccueil/>

                                    <div className="d-flex justify-content-center mb-2">
                                        <button type="button" className="btn btn-primary mt-5">Afficher plus...</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (<DemandeFormation/>)
                }
            </>
        )
    }
}

export default withCookies(Accueil);