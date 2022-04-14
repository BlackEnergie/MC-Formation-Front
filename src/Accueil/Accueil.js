import React, {Component} from 'react';
import {Cookies, withCookies} from 'react-cookie';
import Filtres from './Filtres';
import {instanceOf} from 'prop-types';
import DemandeFormation from '../demandeFormation/DemandeFormation';
import TableAccueil from './TableAccueil/TableAccueil';
import './Accueil.css';
import VueDetailleeFormation from '../VueDetailleeFormation/VueDetailleeFormation';

const cookies = new Cookies();

class Accueil extends Component {


    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            token: cookies.get('token') || '',
            showFormDemande: false,
            showDetail : 0,
            showModif:0

        }
        this.handleClick = this.handleClick.bind(this)
        this.afficherDetail=this.afficherDetail.bind(this)
        this.modifDetail= this.modifDetail.bind(this)
    };

    afficherDetail(val){
        this.setState({showDetail : val});
        console.log(this.state.showDetail);
    };

    modifDetail(val){
        this.setState({showModif : val});
        console.log(this.state.showModif);
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
                            <div className="demandeFormation col-2">
                                <button type="button" className="btn btn-primary mb-2"
                                        onClick={this.handleClick}>Demander une formation
                                </button>
                            </div>
                            <div className="demandes col-2">
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
                {   this.state.showDetail>=1 ?(
                    (<VueDetailleeFormation text={this.state.showDetail} updateState={this.afficherDetail}/>)
                ):this.state.showFormDemande === false ? (
                    <div className="container-fluid" id="accueil">
                        <div className="row">
                            <div className="col-2">
                            <span className="">
                                <Filtres/>
                            </span>
                            </div>
                            <div className="col">
                                <div className="row">

                                    <div className="col">
                                        <div className="row">
                                            {this.renderButtonAsso()}
                                        </div>
                                    </div>
                                </div>

                                <TableAccueil  updateVue={this.afficherDetail} updateModif={this.modifDetail}/>

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
