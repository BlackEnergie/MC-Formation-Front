import './VueDetailleeFormation.css';
import React, {Component} from 'react';
import InformationsGeneralesFormation from './InformationsGeneralesFormation';
import InformationsFicheDeFormation from './InformationsFicheDeFormation';
import FilConducteurFormation from './FilConducteurFormation';

import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';
import {AiOutlineFileText, AiOutlineFolder} from "react-icons/ai";


class VueDetailleeFormation extends Component {


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
            <div className="container-fluid main" >
                <div className="row">
                    <div className="col-md-3" id="arborescence">
                        <div className="row">
                            <table className="table table-borderless ">
                                <tbody>
                                <tr>
                                    <td>
                                        <AiOutlineFileText className="Icones"/>
                                    </td>
                                    <td>
                                        <a
                                            onClick={() => this.setState({showComponent: 1})}
                                            className="text-decoration-none link-dark text-start">
                                            Informations générales
                                        </a>

                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <AiOutlineFolder className="Icones"/>
                                    </td>
                                    <td>
                                        <a
                                            className="text-decoration-none link-dark"
                                            onClick={() => this.afficherTout()}>
                                            Fiche de Formation
                                        </a>
                                    </td>
                                    <td>
                                        {this.state.afficherTout ? (
                                            <img src={require('../Img/chevron haut.png')} alt="" className="Icones"/>
                                        ) : (
                                            <img src={require('../Img/chevron haut.png')} alt="" className="Icones"/>
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
                                                <AiOutlineFileText className="Icones me-2"/>
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
                                                <AiOutlineFileText className="Icones me-2"/>
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

                    <div className="col" >
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

export default withCookies(VueDetailleeFormation);