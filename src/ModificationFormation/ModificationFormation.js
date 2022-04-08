import './ModificationFormation.css';
import React, {Component} from 'react';
import InformationsGeneralesFormation from './InformationsGeneralesFormation';
import InformationsFicheDeFormation from './InformationsFicheDeFormation';
import FilConducteurFormation from './FilConducteurFormation';

import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';


class ModificationFormation extends Component {


    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            showComponent: 0,
            afficherTout: false
        }
    };

    afficherTout() {
        if (this.state.afficherTout === false) {
            this.setState({
                afficherTout: true
            })
        } else {
            this.setState({
                afficherTout: false
            })
        }
    };

    render() {
        return (
            <div className="container-fluid" className="main">
                <div className="row">
                    <div className="col-md-3" id="arborescence">
                        <div className="row">
                            <table className="table table-borderless">
                                <tbody>
                                <tr>
                                    <td className="d-inline-flex">
                                        <img src={require('../Img/un-journal.png')} alt="" className="Icones"/>
                                    </td>
                                    <td>
                                        <a
                                            onClick={() => this.setState({showComponent: 1})}
                                            className="text-decoration-none link-dark">
                                            Informations générales
                                        </a>

                                    </td>
                                </tr>

                                <tr>
                                    <td className="d-inline-flex">
                                        <img src={require('../Img/folder.png')} alt="" className="Icones"/>
                                    </td>
                                    <td>
                                        <a
                                            className="text-decoration-none link-dark"
                                            onClick={() => this.afficherTout()}
                                        >
                                            Fiche de Formation
                                        </a>
                                    </td>
                                    <td>
                                        {this.state.afficherTout ? (
                                            <img src={require('../Img/chevron haut.png')} alt="" className="Icones"/>
                                        ) : (
                                            <img src={require('../Img/chevron bas.png')} alt="" className="Icones"/>
                                        )
                                        }

                                    </td>
                                </tr>

                                {this.state.afficherTout ? (
                                    <>
                                        <tr>
                                            <td>
                                            </td>
                                            <td className="d-inline-flex">
                                                <img src={require('../Img/un-journal.png')} alt="" className="Icones me-4"/>
                                                <a
                                                    onClick={() => this.setState({showComponent: 2})}
                                                    className="text-decoration-none link-dark">
                                                    Informations
                                                </a>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>

                                            </td>
                                            <td className="d-inline-flex">
                                                <img src={require('../Img/un-journal.png')} alt="" className="Icones me-4"/>
                                                <a
                                                    onClick={() => this.setState({showComponent: 3})}
                                                    className="text-decoration-none link-dark">
                                                    Fil Conducteur
                                                </a>
                                            </td>
                                        </tr>
                                    </>
                                ) : (<></>)
                                }

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-md" id="informations">
                        {
                            (this.state.showComponent === 1) ? (
                                <InformationsGeneralesFormation/>
                            ) : (<div></div>)
                        }
                        {
                            (this.state.showComponent === 2) ? (
                                <InformationsFicheDeFormation/>
                            ) : (<div></div>)
                        }
                        {
                            (this.state.showComponent === 3) ? (
                                <FilConducteurFormation/>
                            ) : (<div></div>)
                        }

                    </div>
                </div>
            </div>

        )
    }

}

export default withCookies(ModificationFormation);